import { gql } from "apollo-boost";

export const GET_ALL_BLOGS = gql`
  query getAllBlog {
    getAllBlog {
      name
      status
      id
      heroImage {
        image
      }
      tag
      createdBy
      summary
      authorName
      authorImage
      createdAt
    }
  }
`;

export const GET_BLOGS = gql`
  query getBlog($id: ID!) {
    getBlog(id: $id) {
      name
      status
      body
    }
  }
`;
