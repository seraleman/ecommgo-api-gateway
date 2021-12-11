/**
 * @const RESTDataSource @requires 'apollo-datasource-rest' [Para extender de RESTDataSource]
 */
const { RESTDataSource } = require('apollo-datasource-rest');

/**
 *@const serverConfig @requires '../server' [Para acceder a la URL del microservicio]
 */
const serverConfig = require('../server');

/**
 * @class ProductAPI [Contiene todos lo métodos para acceder a cada propiedad del 
 *  microservicio] Es exportada en la última línea del código: module.exports = ProductAPI;
 */
class ProductAPI extends RESTDataSource {

    /**
     * @constructor {object} baseURL [Enlaza la clase con la url declarada para
     *  microservicio Product_ms en server.js]
     */
    constructor() {
        super();
        this.baseURL = serverConfig.product_api_url;
    }

    /**
     * Devuelve todos los productos de la BD
     * @returns {Objects} [Devuelve la ista de todos los productos]
     */
    async getAllProduct() {
        return await this.get('ms/api/products/')
    }

    /**
     * Devuelve un producto en espeífico
     * @param {String} productId [Id del producto que se va a consultar]
     * @returns {Object} [Devuleve el objeto relacionado con el id pasdado como parámetro]
     */
    async getProductById(productId) {
        return await this.get(`ms/api/products/${productId}`)
    }

    /**
     * Crea un producto
     * @param {Object} productInput [COntiene el objeto con los campos para crear el producto]
     * @returns {Object} [Devuelve el objeto creado]
     */
    async createProduct(product) {
        return await this.post('ms/api/products/', product)
    }

    /**
     * Actualiza un determinado producto
     * @param {String} productId [Id del producto a actualizar]
     * @param {Object} product [Objeto con los campos para actualizar el producto]
     * @returns {Object} [Devueleve el objeto actualizado]
     */
    async updateProduct(productId, product) {
        return await this.put(`ms/api/products/${productId}`, product)
    }
}

/**
 * @const {Object} ProductAPI [exporta la constante para que 
 *  sus métodos estén disponibles]
 */
module.exports = ProductAPI;

