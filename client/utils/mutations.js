import { gql } from '@apollo/client';
// import { saveBook } from './API';

export const LOGIN_USER = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      username
      email
    }
  }
`;

export const CREATE_USER = gql`
    mutation addUser($username:String!, $email:String!, $password: String!){
        addUser(username: $username, email:$email, password:$password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!){
    saveBook(bookData: $bookData) {
        _id
        email
        username
        bookCount
        savedBooks {
            bookId
            title
            authors
            image
            link
        }
    }
  }`

  export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
      removeBook(bookId: $bookId) {
          _id
          username
          savedBooks {
              bookId
              title
              authors
              image
              link
          }
      }
  }
`;