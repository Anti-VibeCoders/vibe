import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/common/components/ui/avatar";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/common/components/ui/badge";
import DropMenuPost from "@/common/components/ui/DropMenuPost";
import { Heart, Share, MessageCircle } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { calculeTime } from "@/common/utils/time";
import { useShare } from "@/hooks/useShare";

function PostInfo() {
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [post, setPost] = useState(null);
    const share = useShare();

    const handleShare = () => {
        share({ url: window.location.href });
    };

    const postsUserFetch = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicationsUser/${id}/`);
            if (response.ok) {
                const data = await response.json();
                setPost(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        postsUserFetch();
    }, [id]);

    return (
        <div className="container-info flex flex-col gap-3 mt-2 w-[96%] mx-auto max-sm:px-6 max-sm:w-full">
            <div className="flex gap-3 items-center w-full">
                <div className="flex w-full gap-1.5">
                    <Avatar className="size-12">
                        <AvatarImage src={post?.avatarImage} className="object-cover" />
                    </Avatar>
                    <div className="flex flex-col w-full">
                        <div className="flex gap-1 items-center">
                            <Link 
                                to={`/home/profile/${post?.id}`} 
                                className="font-semibold hover:text-blue-500 hover:underline"
                            >
                                {post?.user}
                            </Link>
                            {post?.isVerified && (
                                <Badge variant="secondary" className="bg-blue-600 text-white text-xs">✓</Badge>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">
                            {post?.user} • {post && calculeTime(post.created_at)}
                        </span>
                    </div>
                    <DropMenuPost />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <p>{post?.content}</p>
            </div>
            <div className="flex w-full justify-center ">
                <div className="flex items-center justify-between gap-6 w-[100%]">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`text-zinc-400 hover:text-red-500 cursor-pointer ${isLiked && 'text-red-500'}`}
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <Heart className={`h-4 w-4 mr-2 ${isLiked && 'stroke-red-500 fill-red-500'}`} />
                        {isLiked ? '13' : '12'}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-500 cursor-pointer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        13
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-green-500 cursor-pointer"
                        onClick={handleShare}
                    >
                        <Share className="h-4 w-4 mr-2" />
                        2
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PostInfo;
