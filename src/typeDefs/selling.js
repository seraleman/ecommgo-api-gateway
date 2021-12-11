const { gql } = require('apollo-server');

const sellingTypeDefs = gql`

    type Item {
        product: Product!
        quantity: Int!
        price: Int!
        totalItemPrice: Int!
    }

    type Sale {
        id: ID!
        date: String!
        user: User!
        items: [Item!]!
        totalSalePrice: Int!
        closed: Boolean!
    }

    input ItemInput {
        product: String!
        quantity: Int!
        price: Int!
    }

    input CreateCartInput {
        items : [ItemInput!]!
    }

    input UpdateCartInput {
        user: ID
        date: String!
        items : [ItemInput!]!
    }

    input SellInput {
        user: ID
        date: String!
        items: [ItemInput!]!
    }
    
    type Message {
        message: String!
    }

    type Query {
        getAllCarts: [Sale!] 
        getAllSales: [Sale!]
        getAllSalesByUser (userIdInput: ID!): [Sale!]
        getCartOrSaleById(userIdInput: ID, cartIdInput: ID!): Sale!
    }

    type Mutation {
        createCart (cartInput: CreateCartInput!): Sale!
        updateCart (cartIdInput: ID!, cartInput: UpdateCartInput!): Sale!
        sell (cartIdInput: ID!, cartInput: SellInput): Sale!
        deleteCart(cartIdInput: ID!, cartUserIdInput: ID): Message!
    }

`;

module.exports = sellingTypeDefs;