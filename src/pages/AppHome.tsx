import { useNavigate } from "react-router-dom";
import FetchPosts from "./FetchPosts";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page mt-4 xs:mt-8">
      <h1>Apollo Client with React and Typescript</h1>

      <div className="card-top flex justify-between mt-12">
        <h4 className="post-list-header">Recent posts</h4>
        <button
          className="btn btn-small btn-green-outline"
          onClick={() => navigate("/create")}
        >
          + New Post
        </button>
      </div>
      <div className="w-full">
        <FetchPosts />
      </div>
    </div>
  );
}

export default Home;
