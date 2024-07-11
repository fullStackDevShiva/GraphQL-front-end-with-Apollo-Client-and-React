import { gql } from "@apollo/client";

const Create_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export default Create_POST_MUTATION;
