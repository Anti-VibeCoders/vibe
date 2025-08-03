import { useState, useEffect } from "react";
import { loadComments } from "../data/comments";
import type { Comments } from "../types";
import CardComment from "../components/CardComment";
import PostInfo from "../components/PostInfo";
import ImagePost from "../components/ImagePost";
import CreateComment from "../components/CreateComment";

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
            <div className="flex w-full h-full overflow-y-auto max-sm:flex-col max-sm:items-center">
                <div className="flex flex-col flex-1 justify-center items-center max-sm:w-full">
                    <ImagePost/>
                        <PostInfo/>
                </div>
                <div className="flex justify-evenly items-center max-2xl:justify-center flex-col self-center h-full w-xl max-lg:w-sm max-sm:w-full">
                    <div className="container-comment z-20 flex  flex-col gap-2 2xl:gap-3 max-w-xl max-h-100 2xl:max-h-400 sm:border-l-1 border-t-1 sm:border-t-0 items-center overflow-y-auto overflow-hidden py-4">
                        <CardComment/>
                    </div>
                    
                    <div className="Container-create z-50 flex flex-col justify-center items-center border-l-1 border-t-1 w-full max-w-full h-max overflow-hiddedn max-sm:mt-4">
                        <div className="flex items-center w-full h-max" >
                            <CreateComment/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comments;