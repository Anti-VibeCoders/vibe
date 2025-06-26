import FollowCard from "@/components/FollowCard"
import { Search } from "lucide-react";

export default function Friends() {
  const response = {
    data: [
      {
        name: "Elon Musk",
        username: "elonmusk",
        imageUrl:
          "https://hips.hearstapps.com/hmg-prod/images/elon-musk-gettyimages-2147789844-web-675b2c17301ea.jpg",
        follow: true,
      },
      {
        name: "Fazt Code",
        username: "faztweb",
        imageUrl: "https://unavatar.io/faztweb",
        follow: false,
      },
      {
        name: "Yansel Roa",
        username: "yansel",
        imageUrl: "https://avatars.githubusercontent.com/u/112992230?v=4",
        follow: true,
      },
    ],
  }

  return (
    <div className="flex flex-col gap-4 mt-10 px-4 max-w-2xl mx-auto w-full">
      <div className="flex items-center bg-gray-900/30 p-3 rounded-lg w-full">
        <Search className="w-5 h-5 text-white/30 mr-2" />
        <input
          type="search"
          placeholder="Buscar personas"
          className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm sm:text-base"
        />
      </div>
      <div className="flex flex-col gap-4">
        {Array.isArray(response.data) &&
          response.data.map((data, index) => (
            <FollowCard
              key={index}
              username={data.username}
              name={data.name}
              initialIsFollowing={data.follow}
              image={data.imageUrl}
            />
          ))}
      </div>
    </div>
  )
}