
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
=======
import Post from '@/components/Post'

function Home() {
    return (
        <>
            <div className="homepage flex w-full h-full">
                <div className="home-page-right flex-1 flex flex-col gap-12 overflow-y-auto h-full px-8 py-12 max-lg:w-full max-lg:ml-0 max-sm:px-2 max-sm:py-6">
                    <div className="posts w-2xl mx-auto flex flex-col items-center gap-10 max-md:w-full">
                        {[1, 2, 3, 4].map((i) => {
                            return (
                                <Post key={i} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
