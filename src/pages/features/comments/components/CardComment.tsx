import { useState, useEffect } from "react";
import type { Comments } from "../types";
import { Avatar, AvatarImage } from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button"
import { Textarea } from '@/common/components/ui/textarea'
import { Link } from 'react-router-dom'
import { Heart, MoreHorizontal, Clock4Icon, MessageSquareWarningIcon, User} from "lucide-react";
import {loadComments} from "../data/comments";
import { calculeTime } from "@/common/utils/time";

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem, 
} from "@/common/components/ui/dropdown-menu";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger 
} from "@/common/components/ui/dialog"

function CardComment(){
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
    
    return(
        <>
          {comment.map((cmt, id) => (
           <div
            key={id}
            className="flex gap-3 border-1 rounded-lg pl-3 pr-2 py-2 w-[90%]"
           >
             <Avatar className="w-10 h-10">
              <AvatarImage src={cmt.avatarUser} />
            </Avatar>

          <div className="w-full">
            <div className="w-full flex justify-between relative mb-1">
            <Link
             to="/home/profile"
             className="font-semibold cursor-pointer hover:text-blue-500 hover:underline"
            >
             {cmt.username}
           </Link>

           <div className="more-horiz h-max w-max absolute right-0 -top-[13px] p-2 rounded-full">
             <DropdownMenu>
               <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                   <MoreHorizontal className="size-4 inline-block align-middle" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30">
                  <DropdownMenuItem asChild>
                   <Link
                     to="/home/profile"
                     className="w-full flex items-center gap-2 cursor-pointer"
                    >
                     <User className="size-4 inline-block align-middle" />
                     <span>Ver perfil</span>
                   </Link>
                 </DropdownMenuItem>

                 <DropdownMenuItem asChild>
                   <Dialog>
                     <DialogTrigger asChild>
                       <div
                         className="flex items-center w-full text-red-400 cursor-pointer gap-2 pl-2 py-1 hover:bg-zinc-800 rounded-sm"
                         onClick={(e) => e.stopPropagation()}
                       >
                         <MessageSquareWarningIcon className="size-4 text-red-400" />
                         <span>Reportar</span>
                       </div>
                     </DialogTrigger>
                     <DialogContent>
                       <DialogHeader>
                         <DialogTitle>
                           ¿Por qué quieres reportar este comentario?
                         </DialogTitle>
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
           <div className="flex gap-15 text-gray-500">
             <div
               className={`cursor-pointer flex gap-2 items-center text-sm ${
                 cmt.activated ? "fill-red-500 text-red-500" : "text-gray-500"
               }`}
               onClick={() =>
                 setComment(
                   comment.map((item) =>
                     item.id === cmt.id
                       ? { ...item, activated: !item.activated }
                       : item
                   )
                 )
               }
             >
               <Heart
                 className={`size-4 transition-all duration-200 hover:text-red-500 ${
                   cmt.activated ? "fill-red-500 text-red-500" : "text-gray-500"
                 }`}
                 fill={cmt.activated ? "red" : "none"}
               />
               {cmt.like}
             </div>

             <div className="flex gap-2 items-center text-sm">
               <Clock4Icon className="size-4" />
               {calculeTime(cmt.date)}
             </div>
           </div>
         </div>
       </div>
     </div>
 ))}
        </>
    )
}

export default CardComment;