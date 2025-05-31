import { useState } from "react"
import {
    Heart,
    MessageCircle,
    Share,
    MoreHorizontal,
    MapPin,
    Calendar,
    LinkIcon,
    UserPlus,
    Camera,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const userProfile = {
    id: 1,
    name: "Usuario Vibe",
    username: "@Usuario Vibe",
    bio: "Nuevo usuario de vibe",
    location: "Venezuela",
    website: "https://said-coverletter.vercel.app",
    joinDate: "Mayo 2025",
    avatar: "https://github.com/shadcn.png",
    coverImage: "https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-dark-wwdc-2020-3840x2160-1432.jpg",
    followers: 1234,
    following: 567,
    posts: 89,
    verified: true,
}

const mockPosts = [
    {
        id: 1,
        content: "Trabajando en Vibe, la mejor red social que existe 😱",
        timestamp: "Hace 2 horas",
        likes: 24,
        comments: 5,
        shares: 2,
        image: "https://wallpapercat.com/w/full/0/9/c/5815750-3840x2160-desktop-hd-funny-background-photo.jpg",
    },
    {
        id: 2,
        content:
            "Probando la nueva red social Vibe!",
        timestamp: "Hace 1 día",
        likes: 45,
        comments: 12,
        shares: 8,
    },
    {
        id: 3,
        content:
            "Visitando la nueva exposición en el museo de arte de RamCode. El diseño y la tecnología van de la mano 🎨",
        timestamp: "Hace 2 días",
        likes: 67,
        comments: 18,
        shares: 15,
        image: "https://lablab.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Flablab-static-eu%2Fimages%2Fteams%2Fcode-craft-ai-x-dev-hackathon%2Fcm9xjjhp80000356vh72r54cz_imageLink_1c5vow03st.jpg&w=640&q=75",
    },
]

function Profile() {
    const [isFollowing, setIsFollowing] = useState(false)
    const [activeTab, setActiveTab] = useState("posts")

    return (
        <>
            <div className="homepage relative flex h-full w-full">
                <div className="home-page-right flex-1 flex flex-col gap-12 overflow-y-auto h-full px-8 py-12 max-lg:w-full max-lg:ml-0 max-sm:px-2 max-sm:py-6 items-center">
                    <div className="container mx-auto max-w-4xl px-4 py-6">
                        <div className="relative mb-6">
                            <div className="h-48 w-full rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 overflow-hidden">
                                <img
                                    src={userProfile.coverImage || "/placeholder.svg"}
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
                                            <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
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
                                            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                                            {userProfile.verified && (
                                                <Badge variant="secondary" className="bg-blue-600 text-white">
                                                    ✓
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-zinc-400">{userProfile.username}</p>
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
                                <p className="dark:text-zinc-300">{userProfile.bio}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {userProfile.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <LinkIcon className="h-4 w-4" />
                                        <a href={userProfile.website} className="text-blue-500 hover:text-blue-400">
                                            usuario.dev
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Se unió en {userProfile.joinDate}
                                    </div>
                                </div>
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <span className="font-bold dark:text-white">{userProfile.following.toLocaleString()}</span>
                                        <span className="text-zinc-400 ml-1">Siguiendo</span>
                                    </div>
                                    <div>
                                        <span className="font-bold dark:text-white">{userProfile.followers.toLocaleString()}</span>
                                        <span className="text-zinc-400 ml-1">Seguidores</span>
                                    </div>
                                    <div>
                                        <span className="font-bold dark:text-white">{userProfile.posts}</span>
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
                                <div className="space-y-6">
                                    {mockPosts.map((post) => (
                                        <Card key={post.id} className="dark:bg-zinc-900 dark:border-zinc-800 h-max">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback className="bg-zinc-700">UV</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium">{userProfile.name}</p>
                                                                {userProfile.verified && (
                                                                    <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                                                                        ✓
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-zinc-400">
                                                                {userProfile.username} • {post.timestamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <p className="mb-4 dark:text-zinc-100">{post.content}</p>

                                                {post.image && (
                                                    <div className="mb-4 rounded-lg overflow-hidden">
                                                        <img
                                                            src={post.image || "/placeholder.svg"}
                                                            alt="Post content"
                                                            className="w-full h-auto max-h-96 object-cover"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-4 border-t dark:border-zinc-800">
                                                    <div className="flex items-center gap-6">
                                                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-500 cursor-pointer">
                                                            <Heart className="h-4 w-4 mr-2" />
                                                            {post.likes}
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-500 cursor-pointer">
                                                            <MessageCircle className="h-4 w-4 mr-2" />
                                                            {post.comments}
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-green-500 cursor-pointer">
                                                            <Share className="h-4 w-4 mr-2" />
                                                            {post.shares}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
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