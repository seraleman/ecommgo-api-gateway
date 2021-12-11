/**
 * @const RESTDataSource @requires 'apollo-datasource-rest' [Para extender de RESTDataSource]
 */
const { RESTDataSource } = require('apollo-datasource-rest');

/**
 *@const serverConfig @requires '../server' [Para acceder a la URL del microservicio]
 */
const serverConfig = require('../server');

/**
 * @class SellingAPI [Contiene todos lo métodos para acceder a cada propiedad del microservicio]
 *   Es exportada en la última línea del código: module.exports = SellingAPI;
 */
class SellingAPI extends RESTDataSource {

    /**
     * @constructor {object} baseURL [Enlaza la clase con la url declarada para
     *  microservicio Selling_ms en server.js]
     */
    constructor() {
        super();
        this.baseURL = serverConfig.selling_api_url;
    }

    /**
     * Obtiene todas la ventas
     * @returns {Objects} Lista de ventas
     */
    async getAllSales() {
        return await this.get('ms/api/sales/')
    }

    /**
     * Obtiene una venta (sale) en especifico de Selling_ms
     * @param {String} saleId [Id de la venta que se quiere obtener]
     * @returns {Object} [Devuelve la venta a la que pertene el id pasado por argumento]
     */
    async getSaleByID(saleId) {
        return await this.get(`ms/api/sales/${saleId}`)
    }

    /**
     * Persiste la venta (sale)
     * @param {Object} sale [Objeto que viene desde el resolver con la información 
     *  necesaria para crear la venta (sale)] 
     * @returns [Devuelve el objeto venta persistido en la BD con los campos generados por 
     *  el backend]
     */
    async createSale(sale) {
        sale = new Object(JSON.parse(JSON.stringify(sale)))
        return await this.post('ms/api/sales/', sale)
    }

    /**
     * Actualiza determinada venta - carrito de compras (sale -cart)
     * @param {String} saleId [Contiene el id de la venta - carrito de compra a actualizar] 
     * @param {Object} sale [Objeto que viene desde el resolver con la información 
     *  necesaria para actualizar la venta (sale) - Carrito de compra (cart)]
     * @returns {Object} [Devuelve el objeto actualizado]
     */
    async updateSale(saleId, sale) {
        sale = new Object(JSON.parse(JSON.stringify(sale)))
        return await this.put(`ms/api/sales/${saleId}`, sale)
    }

    /**
     * Elimina una venta (sale) - carrito de compras (cart) en especifico
     * @param {String} saleId [Id del objeto a eliminar]
     * @returns [Object] [Mensaje: "Objeto eliminado"]
     */
    async deleteSaleByID(saleId) {
        return await this.delete(`ms/api/sales/${saleId}`)
    }
}

/**
 * @const {Object} SellingAPI [exporta la constante para que 
 *  sus métodos estén disponibles]
 */
module.exports = SellingAPI;