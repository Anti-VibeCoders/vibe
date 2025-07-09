import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Heart, MoreHorizontal } from "lucide-react";

function Comments(){
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
    }

    const [post, setPost] = useState<Posts[]>([])
    const [comment, setComment] = useState<Comments[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadComments = async ()=> {
        try{
            const response = {
        data: [
            {
                id: 0,
                username: "Juanito Perez",
                avatarUser: "https://randomuser.me/api/portraits/men/32.jpg",
                body: "Donde se encuentra ese museo",
                like: 23,
            },
            {
                id: 1,
                username: "Anita perez",
                avatarUser: "https://randomuser.me/api/portraits/women/44.jpg",
                body: "Kirby es super Cuuuuuuuute!! 😍😍😍",
                like: 56,
            },
            {
                id: 2,
                username: "Said Ruíz",
                avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                body: "De hecho el nombre kirby fue elegido por Shigeru Miyamoto por su sonoridad y porque se asemejaba a la personalidad del personaje. Curiosamente, el nombre también está vinculado a una disputa legal entre Nintendo y el abogado John Kirby.",
                like: 34,
            },
            {
                id: 3,
                username: "Santiago espárrago",
                avatarUser: "https://randomuser.me/api/portraits/lego/2.jpg",
                body: "Nah esa cosa es re horrible, ademas me quiero dar un tiro >:C",
                like: 13,
            },
            {
                id: 4,
                username: "Said Ruíz",
                avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                body: "El verdadero kirby modo zelda",
                like: 46,
            },
        ]
       }
       setComment(
                response.data.map((cmt: any) => ({
                    ...cmt,
                })))

    }catch (err) {
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

    if (loading) return <div>Cargando pagina...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    

    return(
        <>
        <div className="flex w-full h-full">
            <div className="flex flex-col flex-1">
                <div className="flex-1 border-b-1">

                </div>
                <div className="flex-1 ">

                </div>
            </div>
            <div className="container-comment flex flex-col gap-1 flex-1 w-full h-auto border-l-1 items-center overflow-y-scroll overflow-hidden">
                {comment.map((cmt) =>(
                    <div className="flex gap-3 border-1 rounded-lg px-2 py-2 w-3/4">
                        <div className="flex gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={cmt.avatarUser} /> 
                            </Avatar>
                        </div>
                        <div className="w-full">
                            <div className="w-full flex justify-between">
                                <span className="font-semibold">{cmt.username} </span>
                                <MoreHorizontal className="size-4 dark:text-white inline-block align-middle"></MoreHorizontal>
                            </div>
                              <div className="flex flex-col gap-4">
                            <p className="text-sm">{cmt.body}</p>

                           <div className="flex gap-2 items-center text-sm">
                             <Heart className="size-4 dark:text-white inline-block align-middle" /> 
                             {cmt.like} 
                             <span className="">Me gustas</span>
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