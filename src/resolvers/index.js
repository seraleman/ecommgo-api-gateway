const lodash = require('lodash');

const authResolver = require('./auth');
const productResolver = require('./product')
const sellingResolver = require('./selling')
const reviewResolver = require('./review')

const resolvers = lodash.merge(authResolver, productResolver, sellingResolver, reviewResolver);

module.exports = resolvers;
