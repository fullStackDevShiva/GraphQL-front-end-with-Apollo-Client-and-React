import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import POSTS_QUERY from "../graphql/queries/FetchPosts";
import { Post } from "../types/AllTypes";
import { FaEye, FaComment, FaHeart } from "react-icons/fa6";

const FetchPosts = () => {
  // const navigate = useNavigate();
  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const postDetails = (id: string) => {
  //   navigate(`/post/${id}`);
  // };

  // const editPost = (id: string) => {
  //   navigate(`/edit/${id}`);
  // };

  return (
    <div className="fetch-posts w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
      {data?.posts.toReversed().map((post: Post) => (
        <Link to={`/post/${post.id}`}>
          <div
            className="card flex flex-col text-center items-center h-80"
            key={post.id}
          >
            <div className="card-top w-full items-center h-52 p-1">
              <img
                src="post_img1.jpg"
                alt="img"
                className="object-cover w-full h-full relative self-center bg-white rounded-xl"
              />
            </div>
            <div className="card-middle w-full h-16 items-center text-left p-1">
              <p className="card-title text-lg font-bold overflow-hidden">
                {post.title.length > 50
                  ? post.title.slice(0, 50) + "..."
                  : post.title}
              </p>
            </div>
            <div className="card-bottom w-full flex justify-evenly items-center text-xs h-12 p-1">
              <span className="flex flex-row">
                <FaComment
                  color="#0096FF"
                  fontSize={16}
                  style={{ marginRight: 2 }}
                />
                200
              </span>
              <span className="flex flex-row">
                <FaHeart
                  color="#E0115F"
                  fontSize={16}
                  style={{ marginRight: 2 }}
                />
                200
              </span>
              <span className="flex flex-row">
                <FaEye
                  color="#9FE2BF"
                  fontSize={16}
                  style={{ marginRight: 2 }}
                />
                500
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FetchPosts;
