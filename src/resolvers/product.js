const { ApolloError } = require('apollo-server');

const productResolver = {
    Query: {
        getProducts: async (_, __, { dataSources }) => {
            const data = (await dataSources.ProductAPI.getAllProduct()).data;
            return data
        },
        getProductById: async (_, { productId }, { dataSources }) => {
            const data = (await dataSources.ProductAPI.getProductById(productId)).data;
            return data
        }
    },
    Mutation: {
        createProduct: async (_, { product }, { dataSources, isSuperuser }) => {

            if (isSuperuser == true) {

                const productNew = {
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    price: product.price,
                }
                const data = (await dataSources.ProductAPI.createProduct(productNew)).data;
                return data
            } else {
                throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
            }
        },
        updateProduct: async (_, { productId, product }, { dataSources, isSuperuser }) => {

            if (isSuperuser == true) {

                const productCurrent = {
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    price: product.price,
                }
                const data = (await dataSources.ProductAPI.updateProduct(productId, productCurrent)).data;
                return data
            } else {
                throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
            }
        },
        disableEnableProduct: async (_, { productId, product }, { dataSources, isSuperuser }) => {

            if (isSuperuser == true) {

                const productCurrent = {
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    price: product.price,
                    enabled: product.enabled
                }
                const data = (await dataSources.ProductAPI.updateProduct(productId, productCurrent)).data;
                return data
            } else {
                throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
            }
        }
    }
};

module.exports = productResolver;