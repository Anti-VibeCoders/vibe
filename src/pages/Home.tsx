import SideNav from "@/components/SideNav";
import Post from "@/components/Post";

function Home() {
  return (
    <>
      <div className="homepage_container">
        <SideNav />

        <main className="post_container">
          {[1, 2, 3, 4].map((i) => {
            return <Post key={i} />;
          })}
        </main>
      </div>
    </>
  );
}

export default Home;
