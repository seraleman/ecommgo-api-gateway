const { gql } = require('apollo-server');

const productTypeDefs = gql`

    type Product {
        id: String!,
        name: String!,
        category: String!
        brand: String!
    }

    type Query{
        products:[Product!]!
    }

`;

module.exports = productTypeDefs;