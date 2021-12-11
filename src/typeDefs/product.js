const { gql } = require('apollo-server');

const productTypeDefs = gql`

    type Product {
        id: ID!
        name: String!
        category: String!
        brand: String!
        price:Int!
        enabled: Boolean!
    }

    type ProductReview {
        id: ID!
        name: String!
        category: String!
        brand: String!
        price:Int!
        reviews: [Review!]
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
        getProducts: [Product!]!
        getProductById (productIdInput: ID!): ProductReview!
    }

    type Mutation {
        createProduct (productInput: createProductInput!): Product!
        updateProduct (productIdInput: ID!, productInput: updateProductInput!): Product!
        disableEnableProduct (productIdInput: ID!, productInput: disableEnableProductInput!): Product!
    }

`;

module.exports = productTypeDefs;