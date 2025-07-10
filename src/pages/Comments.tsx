import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Heart, MoreHorizontal, Clock4Icon, MessageSquareWarningIcon, User } from "lucide-react";
import { Link} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem,} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '../components/ui/textarea'

function Comments() {
    type Posts = {
        id: number;
        username: string;
        avatarUser: string;
        body: string;
        like: number;
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
    useEffect(() => {
        loadComments();

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
                    <div className="flex-1 border-b-1">

                    </div>
                    <div className="flex-1 ">

                    </div>
                </div>
                <div className="container-comment flex flex-col gap-2 2xl:gap-3 flex-1 w-full h-auto border-l-1 items-center overflow-y-scroll overflow-hidden py-4">
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
                                    
                                    <div className="more-horiz h-max w-max absolute right-1 top-0 p-2 rounded-full cursor-pointer">
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
            </div>
        </>
    );
}




export default Comments