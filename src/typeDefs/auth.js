const { gql } = require('apollo-server');

const authTypeDefs = gql`

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

    type UserDetail{
        id: Int
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

    input SignUpInput{
        username: String!
        password: String!
        name: String!
        lastName: String!
        document: String!
        email: String!
        phoneNumber: String!
    }

    input UpdateInput{
        username: String!
        password: String!
        name: String!
        lastName: String!
        document: String!
        email: String!
        phoneNumber: String!
        is_superuser: Boolean!
    }

    input disableEnableUserInput{
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
        userDetailById(userId: Int!): UserDetail!
    }

    type Mutation {
        signUpUser(userInput: SignUpInput!): Token!
        logIn(credentials: CredentialsInput!): Token!
        updateUser(userId: Int!, userInput: UpdateInput!): UserDetail!
        refreshToken(refresh: String!): Access!
        disableUnableUser(userId: Int!, userInput: disableEnableUserInput!): UserDetail!
    }
`;

module.exports = authTypeDefs;