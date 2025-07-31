<<<<<<< HEAD
<<<<<<< HEAD:src/pages/Home.tsx
import Post from "@/components/Post";
=======


import Post from "@/common/components/Post";
>>>>>>> c185db4 (refactor: improve folder structure and organization):src/pages/features/social/pages/Home.tsx
=======
import Post from "../components/posts/Post";
import { examplePosts } from "../data/posts";
>>>>>>> 9ca431b (refactor: improve code separating concerns)

function Home() {
  return (
    <>
      <div className="post__container">
        <div className="post__items">
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