import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Create_POST_MUTATION from "../graphql/mutations/CreatePost";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [createPost] = useMutation(Create_POST_MUTATION, {
    variables: {
      title: title,
      content: content,
    },
    refetchQueries: ["Posts"],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    if (title !== "" || content !== "") {
      if (title.length > 10 && content.length > 10) {
        await createPost();
        // setTitle("");
        // setContent("");
        navigate("/");
      } else {
        alert("Please enter minimum 10 characters");
        return;
      }
    } else {
      alert("Please enter both title and content for your post!");
      return;
    }
  };

  return (
    <div className="create-post-page w-3/4 h-auto items-center p-30">
      <h4>Create a new post</h4>
      <div className="card mt-4 p-12">
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
