const lodash = require('lodash');

const authResolver = require('./auth');
const productResolver = require('./product')

const resolvers = lodash.merge(authResolver, productResolver);

module.exports = resolvers;
