const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query{
    users: [User]
    books: [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password:String!): User
  }
`

module.exports = typeDefs;