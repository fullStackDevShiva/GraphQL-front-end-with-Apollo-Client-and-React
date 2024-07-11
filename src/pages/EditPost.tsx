import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import POST_QUERY from "../graphql/queries/GetPostDetails";
import Update_POST_MUTATION from "../graphql/mutations/UpdatePost";
import { Post } from "../types/AllTypes";

const EditPost = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { postId: id },
  });
  const [title, setTitle] = useState<Post["title"]>(data.post.title || "");
  const [content, setContent] = useState<Post["content"]>(
    data.post.content || ""
  );
  const navigate = useNavigate();

  const [updatePost] = useMutation(Update_POST_MUTATION, {
    variables: {
      updatePostId: id,
      title: title,
      content: content,
    },
    refetchQueries: ["Posts"],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePost();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="card mt-4 mb-8">
      <p className="card-title font-bold">Edit a post</p>
      <form className="max-w-md mt-4" onSubmit={handleSubmit}>
        <section className="flex flex-col field md:flex-row text-left">
          <div className="w-full mt-2 md:mt-0">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </section>
        <section className="flex flex-col field md:flex-row text-left">
          <div className="w-full mt-2 md:mt-0">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              rows={4}
              cols={40}
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <div className="flex mt-4 justify-center">
          <button
            className="btn btn-small btn-green-outline mx-1"
            type="submit"
          >
            Update Post
          </button>
          <button
            className="btn btn-small btn-red-outline mx-1"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
