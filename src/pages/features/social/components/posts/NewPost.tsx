<<<<<<< HEAD:src/pages/NewPost.tsx
<<<<<<< HEAD
import {
  Image,
  FileImage,
  SlidersHorizontal,
  Smile,
  Camera,
  MapPin,
} from "lucide-react";
import Button from "@/components/Button";
export default function NewPost() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //todavia no hecho....
  }
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center gap-4 w-full">
      <h2 className="text-2xl font-semibold">Nuevo Post</h2>
      <input type="text" className="w-full max-w-md outline-0 p-3" placeholder="Titulo" />
      <textarea
        className="w-full max-w-md resize-none w-full max-w-md p-3 outline-0 h-64 overflow-y-scroll rounded-md"
        placeholder="Cuentanos que piensas hoy..."
      ></textarea>
      <div className="w-full max-w-md p-3 rounded-md border-t border-gray-700 flex justify-between items-center max-w-md mx-auto">
        <div className="flex gap-4 text-sky-400 text-xl">
          <label className="cursor-pointer hover:text-sky-300">
            <input type="file" className="hidden" />
            <Image />
          </label>

          <label className="cursor-pointer hover:text-sky-300">
            <input type="file" className="hidden" />
            <FileImage />
          </label>
          <SlidersHorizontal className="cursor-pointer hover:text-sky-300" />
          <Smile className="cursor-pointer hover:text-sky-300" />
          <Camera className="cursor-pointer hover:text-sky-300" />
          <MapPin className="cursor-pointer hover:text-sky-300" />
        </div>
      </div>
      <Button
        text="Postear"
        withClass="w-20"
        type="submit"
      />
    </form>
  );
}
=======
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
=======
import { Card, CardContent } from "@/common/components/ui/card";
import { Textarea } from "@/common/components/ui/textarea";
>>>>>>> c185db4 (refactor: improve folder structure and organization):src/pages/features/social/components/posts/NewPost.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark, ImageIcon } from "lucide-react";
import { useState } from 'react'
import { Button } from "@/common/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPost, handlePostChange, maxChars } from "../../data/posts";

function NewPost() {
    const [postContent, setPostContent] = useState("")
    const [charCount, setCharCount] = useState(0)
    const navigate = useNavigate()

    return (
        <>
            <main className="h-full w-full">
                <div className="mx-auto max-w-2xl p-4 flex justify-center items-center flex-col h-full">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-center mb-2">Crear un nuevo Post</h1>
                        <p className="text-muted-foreground text-center text-sm">Comparte tus pensamientos con la comunidad</p>
                    </div>

                    <Card className="w-full">
                        <CardContent className="p-6 relative">
                            <div className="flex space-x-4 max-sm:flex-col max-sm:items-center max-sm:gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" />
                                    <AvatarFallback>UV</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-4">
                                    <Textarea
                                        placeholder="¿Qué está pasando?"
                                        value={postContent}
                                        onChange={(e) => handlePostChange(e, setPostContent, setCharCount)}
                                        className="min-h-[120px] w-full resize-none border-none p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 break-all max-sm:h-54"
                                    />
                                    <div className="flex items-center justify-between absolute w-[90%] bottom-0 left-1/2 -translate-x-1/2 max-sm:flex-col max-sm:items-center max-sm:gap-4">
                                        <div className="flex items-center space-x-4">
                                            <Button variant="ghost" size="sm" className="cursor-pointer">
                                                <ImageIcon className="h-4 w-4 mr-2" />
                                                Imagen
                                            </Button>
                                            <Button variant="ghost" size="sm" className="cursor-pointer">
                                                <Bookmark className="h-4 w-4 mr-2" />
                                                Encuesta
                                            </Button>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <span
                                                className={`text-sm ${charCount > maxChars * 0.8 ? "text-orange-500" : "text-muted-foreground"}`}
                                            >
                                                {charCount}/{maxChars}
                                            </span>
                                            <Button disabled={!postContent.trim() || charCount > maxChars} className="rounded-full px-6 cursor-pointer" onClick={() => createPost(postContent, setPostContent, navigate)}>
                                                Publicar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default NewPost;
>>>>>>> dee6a02 (feat: add page to create new post when the user clicks the button "Crear Post")
