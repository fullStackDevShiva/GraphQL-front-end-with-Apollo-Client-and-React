import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import POSTS_QUERY from "../graphql/queries/FetchPosts";
import { Post } from "../types/AllTypes";

const FetchPosts = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const postDetails = (id: string) => {
    navigate(`/post/${id}`);
  };

  const editPost = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="fetch-posts w-full mt-2">
      {data.posts.toReversed().map((post: Post) => (
        <div className="card text-left mb-2" key={post.id}>
          <p className="card-title font-bold">{post.title}</p>

          <div className="post-btn flex justify-end mt-4">
            <button
              className="btn btn-small btn-green-outline mx-1"
              onClick={() => postDetails(post.id)}
            >
              View
            </button>

            <button
              className="btn btn-small btn-orange-outline mx-1"
              onClick={() => editPost(post.id)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchPosts;
