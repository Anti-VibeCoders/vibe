import { useState } from "react"
import {
    Heart,
    MessageCircle,
    MapPin,
    Calendar,
    LinkIcon,
    UserPlus,
    Camera,
    User,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar'
import { Button } from "@/common/components/ui/button"
import { Separator } from "@/common/components/ui/separator"
import { Badge } from "@/common/components/ui/badge"
import { Link, useParams } from "react-router-dom"
import { getUserById } from "../data/users"
import { postsByUserExample, getPostsById } from "../data/profile"
import Post from "../../social/components/posts/Post"

function Profile() {
    const [isFollowing, setIsFollowing] = useState(false)
    const [activeTab, setActiveTab] = useState("posts")
    const { id } = useParams()

    const user = getUserById(id!)
    const posts = getPostsById(id!)

    return (
        <>
            <div className="homepage relative flex h-full w-full">
                <div className="home-page-right flex-1 flex flex-col gap-12 overflow-y-auto h-full px-8 py-12 max-lg:w-full max-lg:ml-0 max-sm:px-2 max-sm:py-6 items-center">
                    <div className="container mx-auto max-w-4xl px-4 py-6">
                        <div className="relative mb-6">
                            <div className="h-48 w-full rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 overflow-hidden">
                                <img
                                    src={user?.coverImage || "/placeholder.svg"}
                                    alt="Cover"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute bottom-4 right-4 border-zinc-700 bg-black/50 backdrop-blur-sm hover:bg-zinc-800 "
                            >
                                <Camera className="h-4 w-4 text-white" />
                            </Button>
                        </div>

                        <div className="relative mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                                    <div className="relative -mt-16 sm:-mt-12">
                                        <Avatar className="h-24 w-24 border-4 dark:border-black">
                                            <AvatarImage src={user?.avatar || "/placeholder.svg"} className="object-cover" />
                                            <AvatarFallback className="bg-zinc-700 text-xl">UV</AvatarFallback>
                                        </Avatar>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute bottom-0 right-0 h-8 w-8 border-zinc-700 bg-black hover:bg-zinc-800"
                                        >
                                            <Camera className="h-3 w-3 text-white" />
                                        </Button>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl font-bold">{user?.name}</h1>
                                            {user?.verified && (
                                                <Badge variant="secondary" className="bg-blue-600 text-white">
                                                    ✓
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-zinc-400">{user?.username}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant={isFollowing ? "outline" : "default"}
                                        onClick={() => setIsFollowing(!isFollowing)}
                                        className={isFollowing ? "dark:border-zinc-700 cursor-pointer" : "bg-blue-600 hover:bg-blue-500 cursor-pointer"}
                                    >
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        {isFollowing ? "Siguiendo" : "Seguir"}
                                    </Button>
                                    <Button variant="outline" className="dark:border-zinc-700 cursor-pointer">
                                        <MessageCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <p className="dark:text-zinc-300">{user?.bio}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {user?.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <LinkIcon className="h-4 w-4" />
                                        <a href={user?.website} target="_blank" className="text-blue-500 hover:text-blue-400">
                                            Sitio Web
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Se unió en {user?.joinDate}
                                    </div>
                                </div>
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <span className="font-bold dark:text-white">{user?.following.toLocaleString()}</span>
                                        <Link to="/home/following/1" className="text-zinc-400 ml-1 cursor-pointer hover:text-blue-500 hover:underline">Siguiendo</Link>
                                    </div>
                                    <div>
                                        <span className="font-bold dark:text-white">{user?.followers.toLocaleString()}</span>
                                        <span className="text-zinc-400 ml-1">Seguidores</span>
                                    </div>
                                    <div>
                                        <span className="font-bold dark:text-white">{user?.posts}</span>
                                        <span className="text-zinc-400 ml-1">Publicaciones</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="mb-6 dark:bg-zinc-800" />

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 dark:bg-zinc-900">
                                <TabsTrigger value="posts" className="data-[state=active]:bg-blue-600 cursor-pointer">
                                    Publicaciones
                                </TabsTrigger>
                                <TabsTrigger value="media" className="data-[state=active]:bg-blue-600 cursor-pointer">
                                    Multimedia
                                </TabsTrigger>
                                <TabsTrigger value="likes" className="data-[state=active]:bg-blue-600 cursor-pointer">
                                    Me gusta
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="posts" className="mt-6">
                                <div className="space-y-6 flex flex-col items-center">
                                    {posts ? posts.post.map(post => (
                                        <Post key={post.id} post={post} />
                                    )) : (
                                        <>
                                            <User className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium mb-2">Este usuario todavía no tiene publicaciones</h3>
                                            <p className="text-zinc-400">Cuando suba algo aparecerá aquí</p>
                                        </>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="media" className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="aspect-square bg-zinc-900 rounded-lg overflow-hidden">
                                            <img
                                                src={`/placeholder.svg?height=200&width=200`}
                                                alt={`Media ${i + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="likes" className="mt-6">
                                <div className="text-center py-12">
                                    <Heart className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No hay publicaciones que te gusten aún</h3>
                                    <p className="text-zinc-400">Cuando le des me gusta a una publicación, aparecerá aquí.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile