
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, MoreHorizontal, Share } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'



function Post() {

  const [isLiked, setIsLiked] = useState<boolean>(false);
 
    const [showPreview, setShowPreview] = useState<boolean>(false)

    useEffect(() => {
        if (!showPreview) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowPreview(false)
            }
        }


    window.addEventListener("keydown", handleKeyDown);
    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  }, [showPreview]);


  return (
    <>
      <div className="post_cardContainer">
        <div className="card-top">
          <div className="card-user cursor-pointer">
            <div className="card-user-avatar flex gap-2">
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-blue-600 font-semibold text-black text-xl">
                  V
                </AvatarFallback>
              </Avatar>
              <div className="user-info flex gap-4 relative items-start max-sm:items-start">
                <span className="text-xl font-bold max-sm:text-[16px]">
                  Usuario Vibe
                </span>
                <span className="text-neutral-500 mt-0.5 max-sm:mt-0">
                  @usuario
                </span>
                <p className="absolute bottom-0 left-0.5 text-neutral-500 z-10 cursor-auto">
                  Hace 1 día
                </p>
              </div>
            </div>
          </div>
          <div className="card-description mt-1.5">
            <p className="max-sm:text-[15px]">
              Visitando la nueva exposición en el museo de arte de RamCode
            </p>
          </div>
          <div className="card-i h-full my-1">
            <img
              src={imageUrl}
              className="rounded-sm p-4 cursor-pointer max-sm:p-1"
              onClick={() => {
                setShowPreview(!showPreview);
              }}
            />
          </div>
          <div className="card-footer flex gap-8 items-center max-sm:mt-3">
            <div className="likes flex gap-2 items-center">
              <Heart isClick={isLiked} onClick={() => setIsLiked(!isLiked)} />
              <span>{isLiked ? 77 : 76}</span>
            </div>
            <div className="Comments flex gap-2 items-center">
              <MessageCircle className="cursor-pointer" />
              <span>12</span>
            </div>
            <div className="Share flex gap-2 items-center">
              <Share className="cursor-pointer" />
              <span>8</span>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-hidden"
            onClick={() => setShowPreview(false)}
            onKeyDown={(e) => {
              if (e.key === "ESC") {
                setShowPreview(false);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={imageUrl}
              className="max-h-[90dvh] max-w-[90vw] rounded shadow-lg"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.button
              className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Post;
