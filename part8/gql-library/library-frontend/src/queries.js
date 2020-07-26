import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    id
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    genres
    id
  }
}
`
    // title: String!
    // published: Int!
    // author: Author
    // genres: [String!]!
    // id: ID!

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`

export const EDIT_AUTHORS_BORN = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password,
  ) {
    value
  }
}
`