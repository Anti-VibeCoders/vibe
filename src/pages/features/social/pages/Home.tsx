

import Post from "@/common/components/Post";

function Home() {
  return (
    <>

      <div className="post__container">
        <div className="post__items">
          <div className="posts w-2xl mx-auto flex flex-col items-center gap-10 max-md:w-full">
            {[1, 2, 3, 4].map((i) => {
              return <Post key={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );

}

export default Home;
