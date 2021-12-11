/**
 * @const RESTDataSource @requires 'apollo-datasource-rest' [Para extender de RESTDataSource]
 */
const { RESTDataSource } = require('apollo-datasource-rest');

/**
 *@const serverConfig @requires '../server' [Para acceder a la URL del microservicio]
 */
const serverConfig = require('../server');

/**
 * @class ReviewAPI [Contiene todos lo métodos para acceder a cada propiedad del microservicio]
 *   Es exportada en la última línea del código: module.exports = ReviewAPI;
 */
class ReviewAPI extends RESTDataSource {

    /**
     * @constructor {object} baseURL [Enlaza la clase con la url declarada para
     *  microservicio Review_ms en server.js]
     */
    constructor() {
        super();
        this.baseURL = serverConfig.review_api_url;
    }

    /**
     * Obtiene todos los comentarios de la BD
     * @returns {Objects} [Lista de comentarios de todos los productos]
     */
    async getAllReviews() {
        return await this.get('ms/api/reviews/')
    }

    /**
     * Crea un comentario
     * @param {Object} review [Contiene los campos del comentario a aser creado]
     * @returns {Object} [Devuelve el comentario creado]
     */
    async createReview(review) {
        review = new Object(JSON.parse(JSON.stringify(review)))
        return await this.post('ms/api/reviews/', review)
    }

    /**
     * Actualiza un comentario
     * @param {String} reviewId [Id del comentario que se va a ctualizar]
     * @param {Object} review [Contiene loc ampos para actualizar el comentario]
     * @returns {Object} [DEvueleve el comentario actualizado]
     */
    async updateReview(reviewId, review) {
        review = new Object(JSON.parse(JSON.stringify(review)))
        return await this.put(`ms/api/reviews/${reviewId}`, review)
    }

    /**
     * Elimina un comentario
     * @param {String} reviewId [Id del comentario que se va a eliminar]
     * @returns {String} [Devuelve un mensaje: "Objeto eliminado"]
     */
    async deleteReview(reviewId) {
        return await this.delete(`ms/api/reviews/${reviewId}`)
    }
};

/**
 * @const {Object} ReviewAPI [exporta la constante para que 
 *  sus métodos estén disponibles]
 */
module.exports = ReviewAPI;