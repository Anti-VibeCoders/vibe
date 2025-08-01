import { useState } from "react";
import { findById } from "@/pages/features/social/data/posts";
import { Avatar, AvatarImage } from "@/common/components/ui/avatar";
import { Link } from 'react-router-dom'
import { Badge } from "@/common/components/ui/badge"
import DropMenuPost from '@/common/components/ui/DropMenuPost'
import { Heart, Share, MessageCircle, } from "lucide-react";
import { Button } from "@/common/components/ui/button"
import { useParams } from "react-router-dom";
import { calculeTime } from "@/common/utils/time";
import { useShare } from "@/hooks/useShare";


function PostInfo() {
    const { id } = useParams()
    const realPost = findById(id!)
    const [isLiked, setIsLiked] = useState(false)
    const share = useShare()

    const handleShare = () => {
        share({
            url: window.location.href
        })
    }

    return (
        <>
            <div className="container-info flex flex-col gap-3 mt-2 w-[96%] mx-auto">
                <div className="flex gap-3 items-center w-full">
                    <div className="flex w-full gap-1.5">
                        <Avatar className="size-12">
                            <AvatarImage src={realPost?.avatarImage} className="object-cover" />
                        </Avatar>
                        <div className="flex flex-col w-full">
                            <div className="flex gap-1 items-center">
                                <Link to={`/home/profile/${realPost?.id}`} className="font-semibold hover:text-blue-500 hover:underline">{realPost?.user}</Link>
                                {realPost?.isVerified && (
                                    <Badge variant="secondary" className="bg-blue-600 text-white text-xs">✓</Badge>
                                )}
                            </div>
                            <span className="text-sm text-gray-500">{realPost?.user} • {calculeTime(realPost?.date)}</span>
                        </div>
                        <DropMenuPost />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <p>{realPost?.description}</p>
                </div>
                <div className="flex w-full justify-center ">
                    <div className="flex items-center justify-between gap-6 w-[100%]">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`text-zinc-400 hover:text-red-500 cursor-pointer ${isLiked && 'text-red-500'}`}
                            onClick={() => {
                                setIsLiked(!isLiked)
                            }}
                        >
                            <Heart className={`h-4 w-4 mr-2 ${isLiked && 'stroke-red-500 fill-red-500'}`} />
                            {isLiked ? '13' : '12'}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-500 cursor-pointer">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            13
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-green-500 cursor-pointer" onClick={() => handleShare()}>
                            <Share className="h-4 w-4 mr-2" />
                            2
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostInfo;