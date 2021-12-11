/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server');

/**
 * @constant sellingResolver Contiene todos los métodos para resolver 
 *  los esquemas definidos en /typeDefs/selling.js.
 *  Es exportada en la última línea del código: module.exports = sellingResolver;
 */
const sellingResolver = {
    /**
     * Métodos que solucionan los campos establecidos 
     *  para Query en el esquema TypeDef selling.js.
     *  Consultas.
     */
    Query: {
        /**
         * Obtiene los carritos de compra que están activos,
         *  (ventas que no se han cerrado - sales.closed=true) de Selling_ms.
         * @access superusuario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {Indicador} __ [Significa que no viene nada en los "args"]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Objects} sales [Almacena todas las ventas que retorna la promesa,
         *  al ser filtrado se obtiene los carritos de compra (sale.closed=true)]
         * @returns {Objects} [Devuelve la lista de todas las ventas]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        getAllCarts: async (_, __, { dataSources, isSuperuser, userIdToken }) => {

            if (userIdToken != null) {
                if (isSuperuser) {

                    const sales = (await dataSources.SellingAPI.getAllSales()).data
                    return sales.filter(sale => {
                        return sale.closed == false
                    })
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Obtiene las ventas que ya se cerraron - sales.closed=true) de Selling_ms.
         * @access superusuario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {Indicador} __ [Significa que no viene nada en los "args"]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Objects} sales [Almacena todas las ventas que retorna la promesa,
         *  al ser filtradao se obtiene las ventas cerradas (sale.closed=true)]
         * @returns {Objects} [Devuelve la lista de todas las ventas]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        getAllSales: async (_, __, { dataSources, isSuperuser, userIdToken }) => {

            if (userIdToken != null) {
                if (isSuperuser) {
                    const sales = (await dataSources.SellingAPI.getAllSales()).data
                    return sales.filter(sale => {
                        return sale.closed == true
                    })
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Obtiene todas las ventas que ha realizado un usuario
         * @access Usario autenticado relacionado - superusuario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} userIdInput [Id del usuario que llega desde el cliente]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Object} sales [Almacena todas las ventas que retorna la promesa, 
         *  al ser filtrado por id se obtiene todas las ventas que ha hecho el usuario]
         * @returns {Objects} [Devuelve las ventas filtradas por id de usuario]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        getAllSalesByUser: async (_, { userIdInput }, { dataSources, isSuperuser, userIdToken }) => {

            if (userIdToken != null) {
                if (userIdInput == userIdToken || isSuperuser) {

                    const sales = (await dataSources.SellingAPI.getAllSales()).data
                    return sales.filter(sale => {
                        return sale.user == String(userIdInput) && sale.closed == true
                    })
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Obtiene una venta o un carrito de compra en específico de Sellign_ms
         *  dependiento del id que se le pase como argumento.
         * @access Usario autenticado relacionado - superusuario
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {String} userIdInput [Id del usuario de la venta o el carrito de compra que 
         *   se requiere, traido como parámetro desde el cliente] 
         * @param {String} cartIdInput [Id de la venta o el carrito de compra que se requiere,
         *   traido como parámetro desde el cliente] 
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Boolean} isSuperuser [Define si el usuario es superusuario]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {Objet} sale [Variable que almacena el objeto venta devuelto por la promesa]
         * @returns {Objet} [Devuelve una venta (sale) o un carrito de compra (cart)]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: OK!
         */
        getCartOrSaleById: async (_, { userIdInput, cartIdInput }, { dataSources, isSuperuser, userIdToken }) => {

            if (userIdToken != null) {
                if (userIdToken == userIdInput || isSuperuser) {
                    return (await dataSources.SellingAPI.getSaleByID(cartIdInput)).data
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        }
    },
    /**
     * Métodos que solucionan los campos establecidos para Sale en el esquema TypeDef.
     */
    Sale: {
        /**
         * Obtiene el objeto usuario que stá relacionado en la venta,
         *  esta contiene el id del usuario en el campo 'usuario'.
         * @param {Indicador} __ [Significa que no viene nada en los "args"] 
         * @param {String} user [id del usuario] 
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios] 
         * @returns {Object} [Devuelve el usuario con el id que viene en la varible user]
         * Probado: Ok!
         */
        user: async ({ user }, __, { dataSources }) => {
            return await dataSources.AuthAPI.getUserId(user)
        }
    },
    /**
    * Métodos que solucionan los campos establecidos 
    *   para Item en el esquema TypeDef selling.js.
    */
    Item: {
        /**
         * Obtiene el objeto producto que esta relacionado en el item de la venta,
         *  este contiene el id del producto en el campo 'product'
         * @param {String} product [id del producto]
         * @param {Indicador} __ [Significa que no viene nada en los "args"]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {Array} products Lista de todos los productos en Product_ms
         * @method find [Método que devuelve el producto que su id coincide con el parámetro 
         *  product]
         * @returns {Object} Devuelve el producto que su id coincide con el parámetro product
         * Probado: Ok!
         */
        product: async ({ product }, __, { dataSources }) => {

            const products = (await dataSources.ProductAPI.getAllProduct()).data
            return products.find(item => {
                return item.id === product
            })
        }
    },
    /**
     * Métodos que solucionan los campos establecidos 
     *  para Mutation en el esquema TypeDef selling.js.
     *  (Crear, modificar, eliminar)
     */
    Mutation: {
        /**
         * Crea un carrito de compras (cart)
         * @param {Indicador} _ [Significa que no viene nada en el "parent"] 
         * @param {object} cartInput [Es el objeto que viene como parámetro ingresado para 
         *  construir la venta] 
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {object} cart [Variable en la que se definen los campos que se pasarán 
         *  para construir el carrito de compra (cart)]
         * @fields sale: user, items [Campos necesarios para crear el carrito de compra (cart).
         *  Definidos en typeDefs Selling.js]
         * @returns {objects} [Devuelve un carrito de compra]
         * @throws Devuelve un error de no autenticado
         * Probado: Ok!
         */
        createCart: async (_, { cartInput }, { dataSources, userIdToken }) => {

            if (userIdToken != null) {
                const cart = {
                    user: String(userIdToken),
                    items: cartInput.items
                }
                return (await dataSources.SellingAPI.createSale(cart)).data
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Actualiza un determinado carrito de compra (cart)
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {object} cartIdInput [Es el id del carrito de compras (cart) que viene 
         * como parámetro desde el cliente] 
         * @param {object} cartInput [Es el objeto (cart) que viene como parámetro 
         * desde el cliente para actualizar el carrito de compras (cart)
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {object} cart [Variable en la que se definen los campos que se pasarán 
         *  para actualizar el carrito de compras (cart)]
         * @fields sale: user, date, items [Campos necesarios para actualizar el carrito de 
         * compras (cart) definidos en typeDefs Selling.js]
         * @returns {Object} [Devuelve el carrito de compras (cart) actualizado]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        updateCart: async (_, { cartIdInput, cartInput }, { dataSources, userIdToken }) => {

            if (userIdToken != null) {
                if (userIdToken == cartInput.user) {

                    const cart = {
                        user: String(userIdToken),
                        date: cartInput.date,
                        items: cartInput.items
                    }
                    return (await dataSources.SellingAPI.updateSale(cartIdInput, cart)).data
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },

        /**
         * Realiza una venta: Actualiza un carrito de compra a una venta cerrada
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {object} cartIdInput [Es el id del carrito de compras (cart) que viene 
         * como parámetro desde el cliente] 
         * @param {object} cartInput [Es el objeto (cart) que viene como parámetro 
         * desde el cliente para crear la venta (sale)
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @param {object} sale [Variable en la que se definen los campos que se pasarán 
         *  para crear la venta (sale)]
         * @fields sale: user, date, items, closed [Campos necesarios para crear la venta, 
         *  definidos en typeDefs Selling.js]
         * @returns {Object} [Devuelve una venta (sale)]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        sell: async (_, { cartIdInput, cartInput }, { dataSources, userIdToken }) => {

            if (userIdToken != null) {
                if (cartInput.user == userIdToken) {

                    const sale = {
                        user: String(userIdToken),
                        date: cartInput.date,
                        items: cartInput.items,
                        closed: true
                    }
                    return (await dataSources.SellingAPI.updateSale(cartIdInput, sale)).data
                } else {
                    throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
                }
            } else {
                throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
            }
        },
        
        /**
         * Elimina un carrito de compras.
         * @param {Indicador} _ [Significa que no viene nada en el "parent"]
         * @param {object} cartIdInput [Es el id del carrito de compras (cart) que viene 
         * como parámetro desde el cliente] 
         * @param {object} cartUserIdInput [Es el id del usuario relacionado con el carrito
         *  de compras que se va a eliminar, viene desde el cliente]
         * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
         * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
         * @returns {Object} [Devuelve un objeto con un mensaje: "Objeto eliminado"]
         * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
         * Probado: Ok!
         */
        deleteCart: async (_, { cartIdInput, cartUserIdInput }, { dataSources, userIdToken }) => {

            if (userIdToken != null) {
                if (cartUserIdInput == userIdToken) {
                    return await dataSources.SellingAPI.deleteSaleByID(cartIdInput)
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
module.exports = sellingResolver;