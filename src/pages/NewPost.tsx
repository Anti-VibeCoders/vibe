import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark, ImageIcon } from "lucide-react";
import { useState } from 'react'
import { Button } from "@/components/ui/button";

function NewPost() {
    const [postContent, setPostContent] = useState("")
    const [charCount, setCharCount] = useState(0)
    const maxChars = 280

    const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value
        if (content.length <= maxChars) {
            setPostContent(content)
            setCharCount(content.length)
        }
    }

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
                                        onChange={handlePostChange}
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
                                            <Button disabled={!postContent.trim() || charCount > maxChars} className="rounded-full px-6 cursor-pointer">
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