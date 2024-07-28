import { Link } from "react-router-dom";
import { Post } from "../types/AllTypes";
import { FaComment, FaEye, FaHeart } from "react-icons/fa6";

function CardItem({ post }: { post: Post }) {
  return (
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
        <div className="card-middle w-full h-16 items-center text-left p-1 overflow-hidden">
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
            <FaHeart color="#E0115F" fontSize={16} style={{ marginRight: 2 }} />
            200
          </span>
          <span className="flex flex-row">
            <FaEye color="#9FE2BF" fontSize={16} style={{ marginRight: 2 }} />
            500
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CardItem;
