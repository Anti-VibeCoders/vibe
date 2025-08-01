import { useState, useEffect } from "react";
import { loadComments } from "../data/comments";
import type { Comments } from "../types";
import CardComment from "../component/CardComment";
import PostInfo from "../component/PostInfo";
import ImagePost from "../component/ImagePost";
import CreateComment from "../component/CreateComment";

function Comments() {
    const [comment, setComment] = useState<Comments[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            <div className="sm:flex w-full h-full overflow-y-auto">
                <div className="flex flex-col flex-1 justify-center items-center">
                    <ImagePost/>
                        <PostInfo/>
                </div>
                <div className="flex flex-col self-center">
                    <div className="container-comment z-20 flex flex-col gap-2 2xl:gap-3 max-w-xl max-h-100 sm:border-l-1 border-t-1 sm:border-t-0 items-center overflow-y-auto overflow-hidden py-4">
                        <CardComment/>
                    </div>
                    
                    <div className="Container-create z-50 flex flex-col justify-center items-center  border-l-1 border-t-1 w-full max-w-full h-auto overflow-hidden">
                        <div className="flex items-center w-full" >
                            <CreateComment/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comments;