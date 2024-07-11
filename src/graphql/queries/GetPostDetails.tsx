import { gql } from "@apollo/client";

const POST_QUERY = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      id
      title
      content
    }
  }
`;

export default POST_QUERY;
