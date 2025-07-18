import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Heart, MoreHorizontal, Clock4Icon, MessageSquareWarningIcon, User, Share, MessageCircle, } from "lucide-react";
import { Link} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem,} from "@/components/ui/dropdown-menu";
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '../components/ui/textarea'
import { Badge } from "@/components/ui/badge"
import DropMenuPost from '@/components/ui/DropMenuPost'
import { motion, AnimatePresence } from 'framer-motion'
import Emoji from "@/components/ui/emoji";


function Comments() {
    type Posts = {
        id: number;
        username: string;
        avatarUser: string;
        fileUrl: string;
        body: string;
        like: number;
        date: string;
        comment: number;
        share: number;
    }

    type Comments = {
        id: number;
        username: string;
        avatarUser: string;
        body: string;
        like: number;
        date: string;
        activated: boolean;
    }

    const [post, setPost] = useState<Posts[]>([])
    const [comment, setComment] = useState<Comments[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState(false)
    const [showPreview, setShowPreview] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');
    const [charCount, setCharCount] = useState(0)
    const maxChars = 280

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = e.target.value;
        if (content.length <= maxChars) {
            setInputValue(content);
            setCharCount(content.length);
        }
        };

  // Función que recibe el emoji y lo añade al valor del input
  const handleEmojiSelect = (emoji: string) => {
  setInputValue((prev) => {
    const newValue = prev + emoji;
    if (newValue.length <= maxChars) {
      setCharCount(newValue.length);
      return newValue;
    }
    return prev; // No añadir el emoji si excede el límite
  });
};

    const loadComments = async () => {
        try {
            const response = {
                data: [
                    {
                        id: 0,
                        username: "Juanito Perez",
                        avatarUser: "https://randomuser.me/api/portraits/men/32.jpg",
                        body: "Donde se encuentra ese museo",
                        like: 23,
                        date: "2024-11-20T12:15:00Z",
                    },
                    {
                        id: 1,
                        username: "Anita perez",
                        avatarUser: "https://randomuser.me/api/portraits/women/44.jpg",
                        body: "Kirby es super Cuuuuuuuute!! 😍😍😍",
                        like: 56,
                        date: "2025-05-20T12:15:00Z",
                    },
                    {
                        id: 2,
                        username: "Said Ruíz",
                        avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                        body: "De hecho el nombre kirby fue elegido por Shigeru Miyamoto por su sonoridad y porque se asemejaba a la personalidad del personaje. Curiosamente, el nombre también está vinculado a una disputa legal entre Nintendo y el abogado John Kirby.",
                        like: 34,
                        date: "2025-07-08T12:15:00Z",
                    },
                    {
                        id: 3,
                        username: "Santiago espárrago",
                        avatarUser: "https://randomuser.me/api/portraits/lego/2.jpg",
                        body: "Nah esa cosa es re horrible, ademas me quiero dar un tiro >:C",
                        like: 13,
                        date: "2024-09-20T12:15:00Z",
                    },
                    {
                        id: 4,
                        username: "Said Ruíz",
                        avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                        body: "El verdadero kirby modo zelda",
                        like: 46,
                        date: "2025-03-18T12:15:00Z",
                    },
                ]
            }
            setComment(
                response.data.map((cmt: any) => ({
                    ...cmt,
                    activated: false
                })))

        } catch (err) {
            setError("Error en los comentarios");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const loadPost = async () => {
        try {
            const response = {
                data: [
                    {
                        id: 0,
                        username: "Morty Smith",
                        avatarUser: "https://github.com/shadcn.png",
                        fileUrl: "https://lablab.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Flablab-static-eu%2Fimages%2Fteams%2Fcode-craft-ai-x-dev-hackathon%2Fcm9xjjhp80000356vh72r54cz_imageLink_1c5vow03st.jpg&w=640&q=75",
                        body: "Visitando el nuevo museo de arte de RamCode",
                        like: 12,
                        date: "2025-07-08T12:15:00Z",
                        comment: 13,
                        share: 2,

                    }
                ]
            }
            setPost(response.data .map((p: any) => ({
                ...p,})))
        } catch (err) {
            setError("Error en cargar la publicación");
            console.error(err);
        } finally {
            setLoading(false);
        }
        }

    useEffect(() => {
        loadComments();
        loadPost();
        if (!showPreview) return

        const interval = setInterval(loadComments, 60000);

        return () => clearInterval(interval);
    }, []);

    const calculeTime = (date: string) => {
        const newDate = new Date(date);
        const now = new Date();
        const difference = now.getTime() - newDate.getTime();

        const second = Math.floor(difference / 1000);
        const mminute = Math.floor(second / 60);
        const hour = Math.floor(mminute / 60);
        const days = Math.floor(hour / 24);

        if (second < 60) return "hace un momento";
        if (mminute < 60)
            return `hace ${mminute} minuto${mminute !== 1 ? "s" : ""}`;
        if (hour < 24) return `hace ${hour} hora${hour !== 1 ? "s" : ""}`;
        return `hace ${days} día${days !== 1 ? "s" : ""}`;
    };

    if (loading) return <div>Cargando pagina...</div>;
    if (error) return <div className="text-red-500">{error}</div>;


    return (
        <>
            <div className="flex w-full h-full">
                <div className="flex flex-col flex-1">
                    {post.map((p) => (
                        <div className="w-full h-full">
                            <div className="container-file flex border-b-1 justify-center items-center py-4">
                        <img 
                         src={p.fileUrl} 
                         alt="" 
                         className="w-[95%] h-[85%] rounded-lg "
                         onClick={() => {
                                setShowPreview(!showPreview)
                            }}
                         />
                        </div>

                     <div className="container-info flex flex-col gap-3 mt-2 w-[96%] mx-auto">
                        <div className="flex gap-3 items-center w-full">
                            <div className="flex w-full gap-1.5">
                                <Avatar className="size-12">
                            <AvatarImage src={p.avatarUser}/>
                        </Avatar>
                        <div className="flex flex-col w-full">
                            <div className="flex gap-1 items-center">
                                <Link to="/home/profile" className="font-semibold hover:text-blue-500 hover:underline">{p.username}</Link>
                                <Badge variant="secondary" className="bg-blue-600 text-white text-xs">✓</Badge>
                            </div>
                            <span className="text-sm text-gray-500">{p.username} • {calculeTime(p.date)}</span>
                            </div>
                            <DropMenuPost/>
                        </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <p>{p.body}</p>
                         </div>
                         <div className="flex w-full justify-center pt-5">
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
                                {p.share}
                            </Button>
                        </div>
                        </div>
                        
                       </div>
                        </div>
                    ))}

                    <AnimatePresence>
                {showPreview && (
                    <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-hidden"
                        onClick={() => setShowPreview(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'ESC') {
                                setShowPreview(false)
                            }
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img src="https://lablab.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Flablab-static-eu%2Fimages%2Fteams%2Fcode-craft-ai-x-dev-hackathon%2Fcm9xjjhp80000356vh72r54cz_imageLink_1c5vow03st.jpg&w=640&q=75" className="max-h-[90dvh] max-w-[90vw] rounded shadow-lg" onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        />
                        <motion.button className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >×</motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
                    
                </div>
                <div className="flex flex-col flex-1">
                <div className="container-comment flex flex-col gap-2 2xl:gap-3 w-full h-[80%] border-l-1 items-center overflow-y-scroll overflow-hidden py-4">
                    {comment.map((cmt) => (
                        <div className="flex gap-3 border-1 rounded-lg pl-3 pr-2 py-2 w-[90%]">
                            <div className="flex gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={cmt.avatarUser} />
                                </Avatar>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-between relative mb-1">
                                    <Link to="/home/profile" className="font-semibold cursor-pointer hover:text-blue-500 hover:underline">{cmt.username} </Link>
                                    
                                    <div className="more-horiz h-max w-max absolute right-0 top-[-13px]  p-2 rounded-full cursor-pointer">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className='cursor-pointer'>
                                                <Button variant="ghost" size="icon">
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
                                                                <MessageSquareWarningIcon className="size-4 inline-block align-middle text-red-400"  />
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
                                    <p className="text-sm">{cmt.body}</p>

                                    <div className="flex gap-15 !text-gray-500">
                                        <div className={`cursor-pointer flex gap-2 items-center text-sm ${cmt.activated ? "fill-red-500 text-red-500" : "text-gray-500"}`} onClick={() => {
                                            setComment(comment.map((item) =>
                                                item.id === cmt.id ? { ...item, activated: !item.activated } : item
                                            ));
                                        }}>
                                            <Heart
                                                className={`size-4 inline-block align-middle transition-all duration-200 hover:text-red-500 ${cmt.activated ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                                                onClick={() => {
                                                    setComment(comment.map((item) =>
                                                        item.id === cmt.id ? { ...item, activated: !item.activated } : item
                                                    ));
                                                }}
                                                fill={cmt.activated ? "red" : "none"}
                                            />
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
                <div className="Container-create flex flex-col justify-center items-center flex-1 border-l-1 border-t-1">
                    <div className="flex items-center w-full" >
                        <Emoji onEmojiSelect={handleEmojiSelect}/>
                    <form action="" method="post" className="flex gap-2 items-center w-full">
                        
                    <Textarea 
                    placeholder="Escribe un comentario"
                    className="border-1 flex-1 py-2 px-2 rounded-lg resize-none"
                    value={inputValue}
                    onChange={handleCommentChange}
                    />
                    <input 
                    type="submit" 
                    className="px-2 py-2 bg-blue-500 font-semibold rounded-lg text-black"
                    placeholder=""
                    
                    />
                    </form>
                    </div>
                    <span
                      className={`text-sm ${charCount > maxChars * 0.8 ? "text-orange-500" : "text-muted-foreground"}`}                      >
                      {charCount}/{maxChars}
                    </span>
                </div>
                </div>
            </div>
        </>
    );
}




export default Comments