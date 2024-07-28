import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import POST_QUERY from "../graphql/queries/GetPostDetails";
import {
  FaCircleArrowLeft,
  FaComment,
  FaEye,
  FaHeart,
  FaPenToSquare,
} from "react-icons/fa6";

const PostDetails = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { postId: id },
  });

  // console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="post-details w-full">
      {data && data.post ? (
        <div className="card w-full flex flex-col text-center items-center">
          <div className="card-img w-full h-full items-center p-2 mb-4">
            <img
              src="../post_img1.jpg"
              alt="img"
              className="object-cover w-full h-full relative self-center bg-white rounded-xl"
            />
          </div>
          <div className="card-btns w-full flex flex-row xs:flex-col items-center text-base mb-8 py-2 px-12 xs:px-4">
            <div className="left-btns flex flex-row justify-start xs:justify-center items-center xs:mb-4 w-1/2 xs:w-full">
              <Link to={"/"} className="btn btn-blue-link px-2 mr-4">
                <span className="flex flex-row">
                  <FaCircleArrowLeft
                    color="#36454F"
                    fontSize={24}
                    style={{ marginRight: 4 }}
                  />
                  Go back
                </span>
              </Link>
              <Link
                to={`/edit/${data.post.id}`}
                className="btn btn-blue-link px-2"
              >
                <span className="flex flex-row">
                  <FaPenToSquare
                    color="#FFAA33"
                    fontSize={24}
                    style={{ marginRight: 4 }}
                  />{" "}
                  Edit
                </span>
              </Link>
            </div>
            <div className="right-btns flex flex-row justify-end xs:justify-center items-center w-1/2 xs:w-full">
              <span className="flex flex-row mr-5">
                <FaComment
                  color="#0096FF"
                  fontSize={24}
                  style={{ marginRight: 4 }}
                />
                200
              </span>
              <span className="flex flex-row mr-5">
                <FaHeart
                  color="#E0115F"
                  fontSize={24}
                  style={{ marginRight: 4 }}
                />
                200
              </span>
              <span className="flex flex-row mr-5">
                <FaEye
                  color="#9FE2BF"
                  fontSize={24}
                  style={{ marginRight: 4 }}
                />
                500
              </span>
            </div>
          </div>
          <div className="card-title w-full h-auto items-center text-left mb-4 py-2 px-12 xs:px-4">
            <h1 className="card-title font-bold">{data.post.title}</h1>
          </div>

          <div className="card-body w-full items-center text-left whitespace-pre-line mb-48 py-2 px-12 xs:px-4">
            <p className="text-lg break-normal">{data.post.content}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;
