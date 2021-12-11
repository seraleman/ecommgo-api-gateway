const authTypeDef = require('./auth');
const productTypeDef = require('./product')
const sellingTypeDef = require('./selling')
const reviewTypeDef = require('./review')

const SchemasArrays = [authTypeDef, productTypeDef, sellingTypeDef, reviewTypeDef];

module.exports = SchemasArrays;