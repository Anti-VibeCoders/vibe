import Post from "../components/posts/Post";
import { examplePosts } from "../data/posts";

function Home() {
  return (
    <>
      <div className="post_container">
        <div className="post_items">
          <div className="posts w-2xl mx-auto flex flex-col items-center gap-10 max-md:w-full">
            {examplePosts.map((post, ) => {
              return <Post key={post.id} post={post} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
