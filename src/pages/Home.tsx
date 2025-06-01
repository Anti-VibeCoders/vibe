import SideNav from "@/components/SideNav";
import Post from "@/components/Post";

function Home() {
  return (
    <>
      <SideNav />

      <div className="homepage_postContainer">
        {[1, 2, 3, 4].map((i) => {
          return <Post key={i} />;
        })}
      </div>
    </>
  );
}

export default Home;
