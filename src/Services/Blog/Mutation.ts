import { gql } from "apollo-boost";

export const FILTER_BLOG = gql`
  mutation filterBlogs($category: String) {
    filterBlogs(category: $category) {
      name
      status
      heroImage {
        image
      }
      summary
      authorName
      authorImage
      tag
    }
  }
`;
