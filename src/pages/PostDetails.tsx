import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import POST_QUERY from "../graphql/queries/GetPostDetails";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { postId: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="post-details">
      <div className="card">
        <p className="card-title font-bold">{data.post.title}</p>
        <p className="card-text">{data.post.content}</p>
        <button
          className="btn btn-small btn-red-outline mx-1"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
