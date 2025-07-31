import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar"
import PlaceHolder from '@public/placeholders/placeholder-icon.svg'
import { useNavigate } from "react-router-dom"

function Chat({ name, lastMessage, online, chatId }: { name: string, lastMessage: string, online: boolean, chatId: number }) {
    const navigate = useNavigate()

    return (
        <>
            <div className="chat-container w-full py-2.5 hover:bg-neutral-700/20 cursor-pointer flex px-6" onClick={() => {
                navigate(`/home/messages/${chatId}`)
            }}>
                <div className="chat-header">
                    <div className="chat-header-left flex gap-3 items-center">
                        <div className="avatar relative">
                            <Avatar className="rounded-full size-14">
                                <AvatarFallback>
                                    <img src={PlaceHolder} alt="Placeholder" />
                                </AvatarFallback>
                                <AvatarImage src={PlaceHolder} alt="Placeholder" />
                            </Avatar>
                            {online && (
                            <div className="chat-header-left-text-online absolute bottom-1 right-1 size-3 border-black border bg-green-500 rounded-full"></div>
                            )}
                        </div>
                        <div className="chat-header-left-text">
                            <h2 className="font-semibold">{name}</h2>
                            <h3 className="text-neutral-400">{lastMessage}</h3>
                        </div>
                    </div>
                    <div className="chat-header-right">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat