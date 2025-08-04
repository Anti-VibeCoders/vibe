import { useEffect, useState } from "react";
import Post from "../components/posts/Post";
import type { Post } from "@/common/types/post";
import LoadingPage from "@/common/components/LoadingPage";
import { postsFetch } from "../data/Home";
import { useNavigate } from "react-router-dom";

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
