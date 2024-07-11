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
    <div className="create-post">
      <h4>Create a new post</h4>
      <div className="card mt-4 mb-8">
        <form className="max-w-md mt-4" onSubmit={handleSubmit}>
          <section className="flex flex-col field md:flex-row text-left">
            <div className="w-full mt-2 md:mt-0">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of the post"
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content of the post"
              />
            </div>
          </section>

          <div className="flex mt-4 justify-center">
            <button
              className="btn btn-small btn-green-outline mx-1"
              type="submit"
              disabled={title === "" || content === ""}
            >
              Add Post
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
    </div>
  );
};

export default CreatePost;
