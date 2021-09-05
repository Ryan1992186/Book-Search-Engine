
import gql from 'graphql-tag'

export const QUERY_BOOKS = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                image
                link
            }
        }
    }
`;