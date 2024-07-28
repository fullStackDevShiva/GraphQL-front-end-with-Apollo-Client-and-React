import { useQuery } from "@apollo/client";
import POSTS_QUERY from "../graphql/queries/FetchPosts";
import { Post } from "../types/AllTypes";
import CardItem from "../components/CardItem";

const FetchPosts = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // console.log(data);

  return (
    <div className="post-list">
      {data?.posts.toReversed().map((post: Post) => (
        <CardItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default FetchPosts;
