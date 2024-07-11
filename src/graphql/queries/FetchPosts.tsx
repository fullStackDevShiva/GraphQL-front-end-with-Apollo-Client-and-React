import { gql } from "@apollo/client";

const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      title
      content
    }
  }
`;

export default POSTS_QUERY;
