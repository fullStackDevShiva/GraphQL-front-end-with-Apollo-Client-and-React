import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Create_POST_MUTATION from "../graphql/mutations/CreatePost";
import POSTS_QUERY from "../graphql/queries/FetchPosts";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [createPost] = useMutation(Create_POST_MUTATION, {
    variables: {
      title: title,
      content: content,
    },
    refetchQueries: [{ query: POSTS_QUERY }],
    onCompleted: () => navigate("/"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(title);
    // console.log(content);
    try {
      await createPost();
      console.log("Created the post!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-post-page w-3/4 xs:w-full h-auto items-center p-30 mt-4 xs:mt-8">
      <h1>Create a new post</h1>
      <div className="card mt-4 p-12 xs:p-6">
        <form className="items-center" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col text-left mb-4">
            <label htmlFor="title" className="text-lg font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of the post"
              className="h-10 items-center p-2 text-base border border-blue-500 rounded-md"
            />
          </div>
          <div className="w-full mt-2 md:mt-0 flex flex-col text-left mb-8">
            <label htmlFor="content" className="text-lg font-bold">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content of the post"
              className="p-2 text-base border border-blue-500 rounded-md min-h-44 h-auto max-h-96"
            />
          </div>

          <div className="flex w-full justify-center">
            <button
              className="btn btn-small btn-green-outline mx-1"
              type="submit"
              disabled={title === "" || content === ""}
            >
              Add Post
            </button>
            <button
              className="btn btn-small btn-orange-outline mx-1"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
