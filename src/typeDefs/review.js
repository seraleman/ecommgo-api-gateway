const { gql } = require('apollo-server');

const reviewTypeDefs = gql`

    type Review {
        id: ID
        user: User
        title: String
        text: String
        date: String
    }

    input CreateReviewInput {
        product: ID!
        title: String
        text: String
    }

    input UpdateReviewInput {
        user: ID
        product: ID!
        title: String
        text: String
        date: String!
    }

    type Mutation {
        createReview (reviewInput: CreateReviewInput!): Review!
        updateReview (reviewIdInput: ID!, reviewInput: UpdateReviewInput!): Review!
        deleteReview (reviewIdInput: ID!, userIdInput:ID!): Message!
    }

`;

module.exports = reviewTypeDefs;