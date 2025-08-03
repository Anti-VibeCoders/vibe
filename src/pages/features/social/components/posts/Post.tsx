import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar'
import { Card, CardContent } from '@/common/components/ui/card'
import { Button } from "@/common/components/ui/button"
import { Badge } from "@/common/components/ui/badge"
import { Heart, MessageCircle, Share, } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DropMenuPost from '@/common/components/ui/DropMenuPost'
import { calculeTime } from '@/common/utils/time'
import { useImagePreview } from '@/hooks/useImagePreview'
import type { Post } from '@/common/types/post'
import { useShare } from '@/hooks/useShare'
import { defaultPostValues } from '../../data/posts'

function Post({ post } : { post: Post }) {
    const [isLiked, setIsLiked] = useState(false)
    const navigate = useNavigate()
    const { showImage } = useImagePreview()
    const postData = { ...defaultPostValues, ...post }
    const share = useShare()

    const handleShare = () => {
        share({
            url: window.location.href
        })
    }

    return (
        <>
            <Card className="dark:bg-zinc-900 dark:border-zinc-800 h-max w-xl max-lg:w-full">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                        <Link to={`/home/profile/${post.id}`}>
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={post.avatarImage} className="object-cover" />
                                    <AvatarFallback className="bg-zinc-700">UV</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{post.user}</p>
                                        {post.isVerified && (
                                            <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                                                ✓
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-400">
                                        {post.user} • Hace {calculeTime(post.created_at)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <DropMenuPost />
                    </div>
                    <p className="mb-4 dark:text-zinc-100">{post.content}</p>
                    <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-auto max-h-96 object-cover cursor-pointer"
                            onClick={() => showImage(postData)}
                            />
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t dark:border-zinc-800">
                        <div className="flex items-center gap-6">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-zinc-400 hover:text-red-500 cursor-pointer ${isLiked && 'text-red-500'}`}
                                onClick={() => {
                                    setIsLiked(!isLiked)
                                }}>
                                <Heart className={`h-4 w-4 mr-2 ${isLiked && 'stroke-red-500 fill-red-500'}`} />
                                {isLiked ? '13' : '12'}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-500 cursor-pointer" onClick={() => navigate(`/home/comment/${post.id}`)}>
                                <MessageCircle className="h-4 w-4 mr-2" />
                                13
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-green-500 cursor-pointer" onClick={() => handleShare()}>
                                <Share className="h-4 w-4 mr-2" />
                                2
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card >
        </>
    )
}

export default Post