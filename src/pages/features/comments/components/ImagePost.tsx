import { useImagePreview } from "@/hooks/useImagePreview";
import { useParams } from "react-router-dom";
import { findById } from "@/pages/features/social/data/posts";

function ImagePost(){
    const { id } = useParams()
    const realPost = findById(id!)
    const { showImage } = useImagePreview()
    
    return(
        <>
        <div className="container-file flex border-b-1 justify-center items-center p-6 w-full">
           <img
            src={realPost?.image}
            alt=""
            className="w-full object-contain h-full rounded-lg cursor-pointer"
            onClick={() => showImage(realPost!)}/>
        </div>
        </>
    )
}

export default ImagePost;