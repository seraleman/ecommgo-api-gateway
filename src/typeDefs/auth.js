/**
 * @constant gql @requires desde apollo-server [COnstante para poder declarar los type Defs]
 */
const { gql } = require('apollo-server');

/**
 * @constant authTypeDefs [Lista de todos los type defs de auth]
 */
const authTypeDefs = gql`

    type User {
        id: ID!
        username: String!
        password: String!
        name: String!
        lastName: String!
        document: String!
        email: String!
        phoneNumber: String!
        is_superuser: Boolean!
        enabled: Boolean!
    }

    type Token {
        refresh: String!
        access: String!
    }

    type Access {
        access: String!
    }

    input CredentialsInput {
        username: String!
        password: String!
    }

    input SignUpInput {
        username: String!
        password: String!
        name: String!
        lastName: String!
        document: String!
        email: String!
        phoneNumber: String!
    }

    input UpdateInput {
        username: String!
        password: String!
        name: String!
        lastName: String!
        document: String!
        email: String!
        phoneNumber: String!
        is_superuser: Boolean!
    }

    input disableEnableUserInput {
        username: String!
        password: String!
        name: String!
        lastName: String!
        document: String!
        email: String!
        phoneNumber: String!
        is_superuser: Boolean!
        enabled: Boolean!
    }

    type Query {
        userDetailById (userIdInput: ID!): User!
    }

    type Mutation {
        signUpUser (userInput: SignUpInput!): Token!
        logIn (credentialsInput: CredentialsInput!): Token!
        refreshToken (refreshInput: String!): Access!
        updateUser (userIdInput: ID!, userInput: UpdateInput!): User!
        disableUnableUser (userIdInput: ID!, userInput: disableEnableUserInput!): User!
    }
`;

/**
 * @const {Object} authTypeDefs [exporta la constante para que 
 *  sus typeDefs estén disponibles]
 */
module.exports = authTypeDefs;