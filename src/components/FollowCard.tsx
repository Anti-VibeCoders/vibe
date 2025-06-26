import { useState } from "react"

type FollowCardProps = {
  image: string
  username: string
  name: string
  initialIsFollowing: boolean
}

const FollowCard: React.FC<FollowCardProps> = ({
  image,
  username,
  name,
  initialIsFollowing
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const handleClick = () => setIsFollowing(!isFollowing)

  const buttonClass = isFollowing
    ? "border transition-all duration-300 bg-white text-black hover:bg-transparent hover:text-red-500 hover:border-red-500"
    : "bg-white text-black hover:bg-blue-500"

  return (
    <article
      className="w-full bg-gray-900/30 p-3 rounded-lg flex items-center justify-between gap-3 
                 max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-2"
    >
      <header className="flex items-center gap-3">
        <img
          className="object-cover h-14 w-14 rounded-full"
          src={image}
          alt="Avatar User"
        />
        <div className="flex flex-col">
          <strong className="text-base">{name}</strong>
          <span className="text-white/40 text-sm">@{username}</span>
        </div>
      </header>

      <aside className="ml-auto max-[400px]:ml-0 w-fit max-[400px]:w-full">
        <button
          className={`w-32 h-8 group cursor-pointer p-2 rounded-lg flex items-center justify-center ${buttonClass} 
                      max-[400px]:w-full`}
          onClick={handleClick}
        >
          <span
            className={`font-semibold text-xs sm:text-sm ${
              isFollowing ? "group-hover:hidden block" : ""
            }`}
          >
            {isFollowing ? "Siguiendo" : "Seguir"}
          </span>
          {isFollowing && (
            <span className="hidden group-hover:block text-red-500 font-semibold text-xs sm:text-sm">
              Dejar de seguir
            </span>
          )}
        </button>
      </aside>
    </article>
  )
}

export default FollowCard
