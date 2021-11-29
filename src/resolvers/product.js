const productResolver = {
    Query: {
        products: async (_, __, { dataSources }) => {
            const data = (await dataSources.ProductAPI.getAllProduct()).data;
            return data
        },
    },
};

module.exports = productResolver;