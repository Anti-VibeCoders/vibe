import { useState } from "react";
import { Button } from "@/common/components/ui/button"
import { Textarea } from '@/common/components/ui/textarea'
import Emoji from "@/common/components/ui/emoji";
import { handleCommentChange, handleEmojiSelect, maxChars } from "../data/comments";

function CreateComment(){
    const [inputValue, setInputValue] = useState<string>('');
        const [charCount, setCharCount] = useState(0)
    return(
        <>
        <form className="flex flex-col gap-1 items-center w-full" onSubmit={(e) => e.preventDefault()}>

            <div className="comment-textarea w-full flex justify-between p-2 items-center gap-2">
                <div onClick={(e) => e.preventDefault()} className="">
                    <Emoji onEmojiSelect={(e) => handleEmojiSelect(setInputValue, setCharCount, e)} />
                </div>
                  <Textarea
                    placeholder="Escribe un comentario"
                    className="flex-1 py-2 px-2 border-0 focus-visible:ring-0 resize-none overflow-y-auto w-max max-w-[440px]"
                    value={inputValue}
                    onChange={(e) => handleCommentChange(e, setInputValue, setCharCount)}
                  />
                  <Button
                    type="submit"
                    className="px-4 h-max py-2 mb-1 bg-blue-500 font-semibold rounded-lg text-black cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                   >
                    Comentar
                  </Button>
            </div>
            <div className="flex gap-1 items-center w-full px-2 justify-between">
                 <span
                    className={`text-sm ${charCount > maxChars * 0.8 ? "text-orange-500" : "text-muted-foreground mb-4"}`}                      >
                    {charCount}/{maxChars}
                </span>
            </div>
        </form>
        </>
    )
}

export default CreateComment;