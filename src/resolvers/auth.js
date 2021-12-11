/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server');

/**
 * @constant sellingResolver Contiene todos los métodos para resolver 
 *  los esquemas definidos en /typeDefs/auth.js.
 *  Es exportada en la última línea del código: module.exports = userResolver;
 * @author seraleman
 */
const userResolver = {
    /**
     * Métodos que solucionan los campos establecidos 
     *  para Query en el esquema TypeDef auth.js.
     *  Consultas.
     */
    Query: {
        /**
         * Obtiene la información de un usuario
         * @access Usario autenticado relacionado - superusuario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} userIdInput [Id del usuario que llega desde el cliente]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @returns {Object} [Devuelve al usuario al que pertenece el id pasado como argumento]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: OK!
         */
        userDetailById: async (_, { userIdInput }, { dataSources, isSuperuser, userIdToken }) => {

            if (userIdToken != null) {
                if (userIdInput == userIdToken || isSuperuser) {
                    return await dataSources.AuthAPI.getUserId(userIdInput)
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        }
    },
    /**
     * Métodos que solucionan los campos establecidos 
     *  para Mutation en el esquema TypeDef auth.js.
     *  (Crear, modificar, eliminar)
     */
    Mutation: {
        /**
         * 
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {Object} userInput [Usuario que viene desde el cliente para su creación] 
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Object} user [Permite estructurar el objeto usuario para ser enviado a crear]
         * @returns {Object} [Devuelve el usuario creado por Auth_ms]
         * probado: Ok!
         */
        signUpUser: async (_, { userInput }, { dataSources }) => {

            const user = {
                username: userInput.username,
                password: userInput.password,
                name: userInput.name,
                lastName: userInput.lastName,
                document: userInput.document,
                email: userInput.email,
                phoneNumber: userInput.phoneNumber
            }
            return await dataSources.AuthAPI.createUser(user)
        },

        /**
         * Permite que un usuario existente se autentique en el sistema
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {Object} credentialsInput [Son las credenciales para la autenticación]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @returns {Object} [Retorna el token y el access del usuario autenticado]
         * En el futuro se le podría agregar validación de existencia 
         *  de usuario y error en contraseña
         * Probado: Ok!
         */
        logIn: (_, { credentialsInput }, { dataSources }) => {
            return dataSources.AuthAPI.authRequest(credentialsInput)
        },

        /**
                 * Permite que un usuario existente se autentique en el sistema
                 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
                 * @param {Object} refreshInput [Es el refresh para renovar el token]
                 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
                 * @returns {Object} [Retorna el acces para mantener sesión activa]
                 * Probado: Ok!
                 */
        refreshToken: (_, { refreshInput }, { dataSources }) => {
            return dataSources.AuthAPI.refreshToken(refreshInput)
        },

        /**
         * Actualiza un usuario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} userIdInput [Id del usuario a actualizar]
         * @param {Object} userInput [Contiene los datos a actualizar del usuario]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Object} user [Almacena los valores para actualizar el usuario]
         * @returns {Object} [Retorna el usuario actualizado]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        updateUser: async (_, { userIdInput, userInput }, { dataSources, userIdToken }) => {

            if (userIdToken != null) {
                if (userIdToken == userIdInput) {

                    const user = {
                        username: userInput.username,
                        password: userInput.password,
                        name: userInput.name,
                        lastName: userInput.lastName,
                        document: userInput.document,
                        email: userInput.email,
                        phoneNumber: userInput.phoneNumber,
                        is_superuser: userInput.is_superuser
                    }
                    return await dataSources.AuthAPI.updateUser(userIdInput, user);
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Inhabilita o habilita un usuario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} userIdInput [Id del usuario a inhabilitar]
         * @param {Object} userInput [Contiene los datos del usuario]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Object} user [Almacena los valores para inhabilitar el usuario]
         * @returns {Object} [Retorna el usuario inhabilitado]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        disableUnableUser: async (_, { userIdInput, userInput }, { dataSources, isSuperuser, userIdToken }) => {

            if (userIdToken != null) {
                if (userIdToken == userIdInput || isSuperuser == true) {

                    const user = {
                        username: userInput.username,
                        password: userInput.password,
                        name: userInput.name,
                        lastName: userInput.lastName,
                        document: userInput.document,
                        email: userInput.email,
                        phoneNumber: userInput.phoneNumber,
                        is_superuser: userInput.is_superuser,
                        enabled: userInput.enabled
                    }
                    return await dataSources.AuthAPI.updateUser(userIdInput, user);
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        }
    }
}

/**
 * @const {Object} userResolver [exporta la constante para que 
 *  sus métodos estén disponibles]
 */
module.exports = userResolver;