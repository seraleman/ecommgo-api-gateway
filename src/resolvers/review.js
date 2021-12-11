/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server');

/**
 * @constant reviewResolver Contiene todos los métodos para resolver 
 *  los esquemas definidos en /typeDefs/review.js.
 *  Es exportada en la última línea del código: module.exports = reviewResolver;
 */
const reviewResolver = {
    /**
     * Métodos que solucionan los campos establecidos 
     *  para Review en el esquema TypeDef review.js.
     */
    Review: {
        /**
         * 
         * @param {String} user [Id del usuario relacionado con el comentario] 
         * @param {Indicador} __ [Significa que no viene nada en los "args"]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Objects} users [Lista de todos los usuarios de la BD Auth_ms]
         * @returns {Object} [Devuelve el usuario relacionado con el comentario]
         * Probado: Ok!
         */
        user: async ({ user }, __, { dataSources }) => {

            const users = await dataSources.AuthAPI.getAllUsers()
            return users.find(userObj => {
                return userObj.id == user
            })

        },
        // product: async ({ product }, __, { dataSources }) => {
        //     return await dataSources.ProductAPI.getProductById(product)
        // }
    },
    Mutation: {
        /**
         * Crea un comentario para un producto
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {Object} reviewInput [Objeto que contiene los campos para crear el 
         *  comentario]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @returns {Object} [Devuelve el comnetario creado]
         * @throws Devuelve error de no autenticado
         * Probado: Ok!
         */
        createReview: async (_, { reviewInput }, { dataSources, userIdToken }) => {

            if (userIdToken != null) {

                const review = {
                    user: userIdToken,
                    product: reviewInput.product,
                    title: reviewInput.title,
                    text: reviewInput.text
                }
                return (await dataSources.ReviewAPI.createReview(review)).data
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Actualiza un comentario hecho a un producto
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} reviewIdInput [Id del comentario a actualizar]
         * @param {*} reviewInput [Objeto con los campos necesarios para actualizar el 
         *  comentario]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Object} review [Contiene los campos para actualizar el comentario]
         * @returns {Objetc} [Devueleve el comentario actualizado]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        updateReview: async (_, { reviewIdInput, reviewInput }, { dataSources, isSuperuser, userIdToken }) => {

            if (userIdToken != null) {
                if (userIdToken == reviewInput.user || isSuperuser) {
                    const review = {
                        user: userIdToken,
                        product: reviewInput.product,
                        title: reviewInput.title,
                        text: reviewInput.text,
                        date: reviewInput.date
                    }
                    return (await dataSources.ReviewAPI.updateReview(reviewIdInput, review)).data
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Elimina un comentario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} reviewIdInput [Id del comentario que se va a eliminar]
         * @param {String} userIdInput [Id del usuario que va a eliminar el comentario]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Object} review [Contiene los campos para actualizar el comentario]
         * @returns {String} [Mensaje: "objeto eliminado"]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        deleteReview: async (_, { reviewIdInput, userIdInput }, { dataSources, userIdToken, isSuperuser }) => {

            if (userIdToken != null) {
                if (userIdToken == userIdInput || isSuperuser) {

                    return (await dataSources.ReviewAPI.deleteReview(reviewIdInput)).message
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        }
    }
};

/**
 * @const {Object} sellingResolver [exporta la constante para que 
 *  sus métodos estén disponibles]
 */
module.exports = reviewResolver;