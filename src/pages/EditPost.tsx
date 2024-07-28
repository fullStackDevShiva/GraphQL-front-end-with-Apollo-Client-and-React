import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post } from "../types/AllTypes";
import POST_QUERY from "../graphql/queries/GetPostDetails";
import Update_POST_MUTATION from "../graphql/mutations/UpdatePost";
import POSTS_QUERY from "../graphql/queries/FetchPosts";

const EditPost = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { postId: id },
  });

  const [title, setTitle] = useState<Post["title"]>(data.post.title || null);
  const [content, setContent] = useState<Post["content"]>(
    data.post.content || null
  );

  const navigate = useNavigate();

  const [updatePost] = useMutation(Update_POST_MUTATION, {
    variables: {
      updatePostId: data.post.id,
      title: title,
      content: content,
    },
    refetchQueries: [{ query: POSTS_QUERY }],
    onCompleted: () => navigate(`/post/${data.post.id}`),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePost();
      console.log("Updated the post!");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="edit-post-page w-3/4 xs:w-full h-auto items-center p-30 mt-4 xs:mt-8">
      <h1>Edit post</h1>
      <div className="card mt-4 p-12 xs:p-6">
        <form className="items-center" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col text-left mb-4">
            <label htmlFor="title" className="text-lg font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 items-center p-2 text-base border border-blue-500 rounded-md"
            />
          </div>

          <div className="w-full mt-2 md:mt-0 flex flex-col text-left mb-8">
            <label htmlFor="content" className="text-lg font-bold">
              Content
            </label>
            <textarea
              id="content"
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-44 h-auto max-h-96 p-2 text-base border border-blue-500 rounded-md"
            />
          </div>

          <div className="flex w-full justify-center">
            <button
              className="btn btn-small btn-green-outline mx-1"
              type="submit"
            >
              Update
            </button>
            <button
              className="btn btn-small btn-orange-outline mx-1"
              onClick={() => navigate(`/post/${data.post.id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
