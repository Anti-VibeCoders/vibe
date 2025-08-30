import { Avatar, AvatarImage } from "@/common/components/ui/avatar";
import { useState, useEffect } from "react";
import { loadFollow } from "../data/following";
import type { followings } from "../types/following";

function Following() {
  const [following, setFollowing] = useState<followings[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFollow(setFollowing, setError, setLoading);

    const interval = setInterval(loadFollow, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div className="flex flex-col gap-4 my-6 items-center w-full h-full">
        <div className="flex w-3/4 dark:bg-[#1a1a1a6b] border-1 rounded-lg items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 text-gray-300">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
          </svg>
          <input
            type="text"
            className="bg-transparent border-none dark:bg-[#1a1a1a6b] outline-none dark:text-white placeholder:text-gray-400 w-full ml-3"
            placeholder="Buscar a un usuario..."
          />
        </div>
        <div className="flex flex-col gap-4 w-3/4">
          {following.map((follow) => (
            <div
              key={follow.id}
              className="group relative flex justify-between items-center w-full h-auto dark:bg-zinc-900 rounded-lg p-4 border border-neutral-500 overflow-hidden"
            >
              {follow.backgroundUser && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{ backgroundImage: `url(${follow.backgroundUser})` }}
                />
              )}
              <div className="relative z-10 flex flex-1 gap-5 items-center w-full">
                <Avatar className="w-15 h-15">
                  <AvatarImage src={follow.avatarUser} />
                </Avatar>
                <b className="text-lg font-semibold">{follow.username}</b>
              </div>
              <button
                className="relative z-10 bg-blue-500 px-4 py-2 rounded-md text-black text-sm font-semibold cursor-pointer">
                Siguiendo
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Following