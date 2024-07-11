import { gql } from "@apollo/client";

const Update_POST_MUTATION = gql`
  mutation Mutation($updatePostId: ID!, $title: String, $content: String) {
    updatePost(id: $updatePostId, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export default Update_POST_MUTATION;
