import SideNav from "@/components/SideNav"
import Post from '@/components/Post'

function Home() {
    return (
        <>
        <div className="homepage relative flex h-[100dvh] w-full">
            <div className="home-page-left fixed left-0 top-1/2 -translate-y-1/2 w-64 flex items-center justify-center z-20 pl-6">
                <SideNav />
            </div>
            <div className="home-page-right ml-64 flex-1 flex flex-col gap-12 overflow-y-auto h-[100dvh] px-8 py-12">
                {[1, 2, 3, 4].map((i) => {
                    return (
                        <Post key={i}/>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Home