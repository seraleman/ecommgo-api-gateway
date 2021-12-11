/**
 * @const RESTDataSource @requires 'apollo-datasource-rest' [Para extender de RESTDataSource]
 */
const { RESTDataSource } = require('apollo-datasource-rest');

/**
 *@const serverConfig @requires '../server' [Para acceder a la URL del microservicio]
 */
const serverConfig = require('../server');

/**
 * @class AuthAPI [Contiene todos lo métodos para acceder a cada propiedad del microservicio]
 *   Es exportada en la última línea del código: module.exports = AuthAPI;
 */
class AuthAPI extends RESTDataSource {

    /**
     * @constructor {object} baseURL [Enlaza la clase con la url declarada para
     *  microservicio Auth_ms en server.js]
     */
    constructor() {
        super();
        this.baseURL = serverConfig.auth_api_url;
    }

    /**
     * Crea un usuario
     * @param {]Object} user [Contiene todos los campos para crear el usuario] 
     * @returns {Object} [Devuelve el usuario creado]
     */
    async createUser(user) {
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post('userCreate/', user);
    }

    /**
     * Obtiene todos los usuarios
     * @returns {Objects} [Devuelve todos los usuarios existentes]
     */
    async getAllUsers() {
        return await this.get('user/');
    }

    /**
     * Obtiene un usuario en especial
     * @param {String} userId [Id del usuario que se quiere obtener] 
     * @returns {Object} [Devuelve el usuario al que pertenece el id pasado por parámetro]
     */
    async getUserId(userId) {
        return await this.get(`user/${userId}/`);
    }

    /**
     * Actualiza un usuario
     * @param {String} userId [Id del usuario que se quiere actualizar]
     * @param {Object} user [Contiene todos los campos para actualizar el usaurio] 
     * @returns {Object} [Devuelve el usuario actualizado]
     */
    async updateUser(userId, user) {
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.put(`userUpdate/${userId}/`, user);
    }

    /**
     * Autentica un usuario existente
     * @param {Object} credentials [Contiene el usuario y contraseña para que el usuario se 
     *  autentique] 
     * @returns {Object} [Devuelve el access y el token propio del usuario]
     */
    async authRequest(credentials) {
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));
        return await this.post(`login/`, credentials);
    }

    /**
     * Permite refrescar el token del usuario autenticado
     * @param {String} token [refresh: pasado por argumento desde el cliente] 
     * @returns {object} [Retorna el access perteneciente al usuario autenticado]
     */
    async refreshToken(token) {
        token = new Object(JSON.parse(JSON.stringify({ refresh: token })));
        return await this.post('refresh/', token);
    }
}

/**
 * @const {Object} AuthAPI [exporta la constante para que 
 *  sus métodos estén disponibles]
 */
module.exports = AuthAPI;