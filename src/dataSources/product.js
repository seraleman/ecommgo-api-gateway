const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class ProductAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.product_api_url;
    }

    async getAllProduct() {
        return await this.get('ms/api/products/');
    }
}

module.exports = ProductAPI;

