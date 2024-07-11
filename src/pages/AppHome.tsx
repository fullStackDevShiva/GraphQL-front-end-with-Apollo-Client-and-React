import { useNavigate } from "react-router-dom";
import FetchPosts from "./FetchPosts";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-page w-full">
      <h3>Apollo Client with React and Typescript</h3>

      <div className="card-top flex justify-between mt-12">
        <h4 className="post-list-header">Post List</h4>
        <button
          className="btn btn-small btn-blue-outline"
          onClick={() => navigate("/create")}
        >
          New Post
        </button>
      </div>

      <div className="w-full">
        <FetchPosts />
      </div>
    </div>
  );
}

export default Home;
