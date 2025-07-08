import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

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
                body: "Sabias que El nombre kirby fue elegido por Shigeru Miyamoto por su sonoridad y porque se asemejaba a la personalidad del personaje. Curiosamente, el nombre también está vinculado a una disputa legal entre Nintendo y el abogado John Kirby.",
                like: 34,
            },
            {
                id: 3,
                username: "Santiago espárrago",
                avatarUser: "https://randomuser.me/api/portraits/lego/2.jpg",
                body: "Nah esa cosa es re horrible, ademas me quiero dar un tiro >:C",
                like: 13,
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
            <div className="container-comment flex flex-col flex-1 h-full border-l-1">
                {comment.map((cmt) =>(
                    <div className="w-1/2">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={cmt.avatarUser} /> 
                            </Avatar>
                            <span className="font-semibold">{cmt.username}</span>
                        </div>
                        <div className="">
                            <p className="text-sm">{cmt.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}


    

export default Comments