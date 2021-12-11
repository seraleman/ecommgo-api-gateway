/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server');

/**
 * @constant productResolver Contiene todos los métodos para resolver 
 *  los esquemas definidos en /typeDefs/product.js.
 *  Es exportada en la última línea del código: module.exports = productResolver;
 * @author seraleman
 */
const productResolver = {
    /**
     * Métodos que solucionan los campos establecidos 
     *  para Query en el esquema TypeDef product.js.
     *  Consultas.
     */
    Query: {
        /**
         * Obtiene todos los productos de Product_ms
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {Indicador} __ [Significa que no viene nada en los "args"]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @returns {Objects} [Devuelte todos los productos de la BD]
         * Probado: Ok!
         */
        getProducts: async (_, __, { dataSources }) => {
            return (await dataSources.ProductAPI.getAllProduct()).data;
        },

        /**
         * Obtiene determinado producto
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} productIdInput [Id del producto] 
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @returns {Object} [Devuelve el producto específico de acuerdo al id que se pasó 
         *  por argumento]
         * Probado: Ok!
         */
        getProductById: async (_, { productIdInput }, { dataSources }) => {
            return (await dataSources.ProductAPI.getProductById(productIdInput)).data;
        }
    },
    /**
     * COntiene los métodos que solucionan los campos establecidos en TypeDefs product.js
     */
    ProductReview: {
        /**
         * Devuelve los comentarios (reviews) de los productos hechos por los clientes
         * @param {String} id [Id del comentario (review)] 
         * @param {Indicador} __ [Significa que no viene nada en los "args"]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Objects} reviews [Lista de todas los comentarios (reviews)]
         * @returns [Devuelve cada comentario relacionado con un producto]
         * Probado: Ok!
         */
        reviews: async ({ id }, __, { dataSources }) => {
            const reviews = (await dataSources.ReviewAPI.getAllReviews()).data
            return reviews.filter(review => {
                return review.product == id
            })
        }
    },
    /**
     * Contiene todos los métodos que contiene Mutation en los TypeDefs product.js
     * (Crea, Actualiza, Elimina)
     */
    Mutation: {
        /**
         * Crea un producto
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {Object} productInput [Contiene todos lo campos para crear un producto]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {Object} product [Estructura los campos para contruir el producto]
         * @returns {Object} [Devuelve el producto creado]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        createProduct: async (_, { productInput }, { dataSources, isSuperuser }) => {

            if (isSuperuser != null) {
                if (isSuperuser) {

                    const product = {
                        name: productInput.name,
                        category: productInput.category,
                        brand: productInput.brand,
                        price: productInput.price,
                    }
                    return (await dataSources.ProductAPI.createProduct(product)).data;
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Actualiza determinado producto
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {string} productIdInput [Id del producto a actualizar]
         * @param {Object} productInput [Objeto con los campos para actualizar el producto]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {Object} producto [Objeto donde se determinan los datos para actualizar el
         *  producto]
         * @returns {Object} [Devuelve el producto actualizaco]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        updateProduct: async (_, { productIdInput, productInput }, { dataSources, isSuperuser }) => {

            if (isSuperuser != null)
                if (isSuperuser) {

                    const product = {
                        name: productInput.name,
                        category: productInput.category,
                        brand: productInput.brand,
                        price: productInput.price,
                    }
                    return (await dataSources.ProductAPI.updateProduct(productIdInput, product)).data;
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
                } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },
        /**
         * Inhabilita un producto
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {string} productIdInput [Id del producto a actualizar]
         * @param {Object} productInput [Objeto con los campos para actualizar el producto]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {Object} product [Objeto en el que se establecen los campor del producto]
         * @returns {Object} [Devuelve el objeto habilitado o deshabilitado]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        disableEnableProduct: async (_, { productIdInput, productInput }, { dataSources, isSuperuser }) => {

            if (isSuperuser != null) {
                if (isSuperuser) {

                    const product = {
                        name: productInput.name,
                        category: productInput.category,
                        brand: productInput.brand,
                        price: productInput.price,
                        enabled: productInput.enabled
                    }
                    return (await dataSources.ProductAPI.updateProduct(productIdInput, product)).data;
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        }
    }
};

/**
 * @const {Object} productResolver [exporta la constante para que 
 *  sus métodos estén disponibles]
 */
module.exports = productResolver;