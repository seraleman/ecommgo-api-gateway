const { gql } = require('apollo-server');

const productTypeDefs = gql`

type Product {
        id: String!
        name: String!
        category: String!
        brand: String!
        price:Int!
        enabled: Boolean!
    }

    input createProductInput {
        name: String!
        category: String!
        brand: String!
        price: Int!
    }

    input updateProductInput {
        name: String!
        category: String!
        brand: String!
        price: Int!
    }

    input disableEnableProductInput {
        name: String!
        category: String!
        brand: String!
        price: Int!
        enabled: Boolean!
    }

    type Query {
        getProducts:[Product!]!
        getProductById(productId:ID!):Product!
    }

    type Mutation {
        createProduct(product: createProductInput!):Product!
        updateProduct(productId: ID!, product: updateProductInput!):Product!
        disableEnableProduct(productId: ID!, product: disableEnableProductInput!):Product!
    }

`;

module.exports = productTypeDefs;