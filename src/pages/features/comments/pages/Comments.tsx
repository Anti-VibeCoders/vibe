import { Avatar, AvatarImage } from "@/common/components/ui/avatar";
import { useState, useEffect } from "react";
import { Heart, MoreHorizontal, Clock4Icon, MessageSquareWarningIcon, User, Share, MessageCircle, } from "lucide-react";
import { Link } from 'react-router-dom'
import { Button } from "@/common/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, } from "@/common/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog"
import { Textarea } from '@/common/components/ui/textarea'
import { Badge } from "@/common/components/ui/badge"
import DropMenuPost from '@/common/components/ui/DropMenuPost'
import Emoji from "@/common/components/ui/emoji";
import { useParams } from "react-router-dom";
import { findById } from "@/pages/features/social/data/posts";
import { calculeTime } from "@/common/utils/time";
import { handleCommentChange, handleEmojiSelect, loadComments, maxChars } from "../data/comments";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { Comments } from "../types";

function Comments() {
    const { id } = useParams()
    const realPost = findById(id!)
    const { showImage } = useImagePreview()
    const [comment, setComment] = useState<Comments[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState(false)
    const [inputValue, setInputValue] = useState<string>('');
    const [charCount, setCharCount] = useState(0)

    useEffect(() => {
        loadComments(setLoading, setComment, setError);
        const interval = setInterval(loadComments, 60000);

        return () => {
            clearInterval(interval)
        }
    }, []);

    if (loading) return <div>Cargando pagina...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
            <div className="sm:flex w-full h-full ml-4">
                <div className="flex flex-col flex-1 justify-center items-center">
                    <div className="h-full flex flex-col items-center justify-center w-full">
                        <div className="container-file flex border-b-1 justify-center items-center p-6 w-full">
                            <img
                                src={realPost?.image}
                                alt=""
                                className="w-full object-contain h-full rounded-lg cursor-pointer"
                                onClick={() => showImage(realPost!)}/>
                        </div>
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
                                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-green-500 cursor-pointer">
                                        <Share className="h-4 w-4 mr-2" />
                                        2
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col self-center">
                    <div className="container-comment z-20 flex flex-col gap-2 2xl:gap-3 max-w-xl h-[80%] border-l-1 border-t-1 sm:border-t-0 items-center overflow-y-auto overflow-hidden py-4">
                        {comment.map((cmt, id) => (
                            <div key={id} className="flex gap-3 border-1 rounded-lg pl-3 pr-2 py-2 w-[90%]">
                                <div className="flex gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={cmt.avatarUser} />
                                    </Avatar>
                                </div>
                                <div className="w-full">
                                    <div className="w-full flex justify-between relative mb-1">
                                        <Link to="/home/profile" className="font-semibold cursor-pointer hover:text-blue-500 hover:underline">{cmt.username} </Link>
                                        <div className="more-horiz h-max w-max absolute right-0 -top-[13px] p-2 rounded-full">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button variant="ghost" size="icon" className="cursor-pointer">
                                                        <MoreHorizontal className="size-4 inline-block align-middle" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-30">
                                                    <DropdownMenuItem asChild>
                                                        <Link to="/home/profile" className="w-full flex items-center gap-2 cursor-pointer">
                                                            <User className="size-4 inline-block align-middle" />
                                                            <span>Ver perfil</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild >
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div className="flex items-center w-full text-red-400 cursor-pointer gap-2 pl-2 py-1 hover:bg-zinc-800  rounded-sm" onClick={e => e.stopPropagation()}>
                                                                    <MessageSquareWarningIcon className="size-4 inline-block align-middle text-red-400" />
                                                                    <span>Reportar</span>
                                                                </div>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>¿Por qué quieres reportar este comentario?</DialogTitle>
                                                                    <DialogDescription>
                                                                        Por favor, describe el motivo de tu reporte.
                                                                        <Textarea className="mt-4" />
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Cancelar</Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button className="bg-red-500 text-white">Reportar</Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <p className="text-xs sm:text-sm">{cmt.body}</p>
                                        <div className="flex gap-15 !text-gray-500">
                                            <div className={`cursor-pointer flex gap-2 items-center text-sm ${cmt.activated ? "fill-red-500 text-red-500" : "text-gray-500"}`} onClick={() => {
                                                setComment(comment.map((item) =>
                                                    item.id === cmt.id ? { ...item, activated: !item.activated } : item
                                                ));
                                            }}>
                                                <Heart
                                                    className={`size-4 inline-block align-middle transition-all duration-200 hover:text-red-500 ${cmt.activated ? "fill-red-500 text-red-500" : "text-gray-500"}`} onClick={() => {
                                                        setComment(comment.map((item) =>
                                                            item.id === cmt.id ? { ...item, activated: !item.activated } : item
                                                        ));
                                                    }} fill={cmt.activated ? "red" : "none"} />
                                                {cmt.like}
                                            </div>
                                            <div className="flex gap-2 items-center text-sm">
                                                <Clock4Icon className="size-4 inline-block align-middle" />
                                                {calculeTime(cmt.date)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="Container-create z-50 flex flex-col justify-center items-center  border-l-1 border-t-1 w-full max-w-full h-auto overflow-hidden">
                        <div className="flex items-center w-full" >
                            <form className="flex flex-col gap-1 items-center w-full" onSubmit={(e) => e.preventDefault()}>

                                <div className="comment-textarea w-full flex justify-between p-2 items-center gap-2">
                                    <div onClick={(e) => e.preventDefault()} className="absolute bottom-28">
                                        <Emoji onEmojiSelect={(e) => handleEmojiSelect(setInputValue, setCharCount, e)} />
                                    </div>
                                    <Textarea
                                        placeholder="Escribe un comentario"
                                        className="flex-1 py-2 px-2 border-0 focus-visible:ring-0 resize-none overflow-y-scroll pl-12 w-max max-w-[465px]"
                                        value={inputValue}
                                        onChange={(e) => handleCommentChange(e, setInputValue, setCharCount)}
                                    />
                                    <Button
                                        type="submit"
                                        className="px-4 h-max py-2 mb-1 bg-blue-500 font-semibold rounded-lg text-black cursor-pointer"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Comentar
                                    </Button>
                                </div>
                                <div className="flex gap-1 items-center w-full px-2 justify-between">
                                    <span
                                        className={`text-sm ${charCount > maxChars * 0.8 ? "text-orange-500" : "text-muted-foreground mb-4"}`}                      >
                                        {charCount}/{maxChars}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comments