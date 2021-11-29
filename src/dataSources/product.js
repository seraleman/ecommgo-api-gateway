const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class ProductAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.product_api_url;
    }

    async getAllProduct() {
        return await this.get('ms/api/products/')
    }

    async getProductById(productId) {
        return await this.get(`ms/api/products/${productId}`)
    }

    async createProduct(productInput) {
        return await this.post('ms/api/products/', productInput)
    }

    async updateProduct(productId, product){
        return await this.put(`ms/api/products/${productId}`, product)
    }
}

module.exports = ProductAPI;

