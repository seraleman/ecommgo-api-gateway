const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class AuthAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.auth_api_url;
    }

    async createUser(user) {
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post('userCreate/', user);
    }

    async getUserId(userId) {
        return await this.get(`user/${userId}/`);
    }

    async updateUser(userId, user) {
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.put(`userUpdate/${userId}/`, user);
    }

    async authRequest(credentials) {
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));
        return await this.post(`login/`, credentials);
    }

    async refreshToken(token) {
        token = new Object(JSON.parse(JSON.stringify({ refresh: token })));
        return await this.post('refresh/', token);
    }
}

module.exports = AuthAPI;