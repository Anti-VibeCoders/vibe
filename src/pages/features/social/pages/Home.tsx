import { useEffect, useState } from "react";
import Post from "../components/posts/Post";
import type { Post } from "@/common/types/post";
// import { postsFetch } from "../data/posts";

function Home() {
  const [posts, setPosts] = useState<any>(null)
  // let posts: any[] = []
  // postsFetch().then((data) => {
  //   posts = data
  // })

  const postsFetch = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/publications/", { method: 'GET' })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setPosts(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    postsFetch()
  }, [])

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
