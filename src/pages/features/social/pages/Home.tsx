<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import Post from "../components/posts/Post";
import type { Post } from "@/common/types/post";
<<<<<<< HEAD
// import { postsFetch } from "../data/posts";
>>>>>>> 9940c0d (feat: connect posts API to home)
=======
import LoadingPage from "@/common/components/LoadingPage";
import { postsFetch } from "../data/Home";
import { useNavigate } from "react-router-dom";
>>>>>>> b51abe8 (refactor: improve code separating concerns)

function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
    postsFetch(setLoading, setPosts)
  }, [])

  if (loading) return <LoadingPage loading={loading} />


  return (
    <>
      <div className="post__container">
        <div className="post__items">
          <div className="posts w-2xl mx-auto flex flex-col items-center gap-10 max-md:w-full">
            {posts?.map((post: Post,) => {
              return <Post key={post.id} post={post} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;