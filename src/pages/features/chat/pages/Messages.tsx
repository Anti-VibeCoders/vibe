import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar"
import { EllipsisVertical, Search, Paperclip, Image, Mic, Send } from "lucide-react"
import Chat from '@/pages/features/chat/components/Chat'
import PlaceHolder from '@/../public/placeholders/placeholder-icon.svg'
import Message from '@/pages/features/chat/components/Message'
import { getChatById, individualChat, onSendMessage, searchChat } from '../data/messages'
import { useParams } from 'react-router-dom'
import type { IndividualChatType } from '../types/individualChat'

function Messages() {
    const [chatHistory, setChatHistory] = useState<IndividualChatType[]>(individualChat)
    const [message, setMessage] = useState<string>('')
    const [searchChatInput, setSearchChatInput] = useState<string>('')
    const { id } = useParams()
    const chat = getChatById(id!)
    const messageContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    }, [chatHistory])

    useEffect(() => {
        searchChat(searchChatInput)
    }, [searchChatInput])
    
    return (
        <>
            <div className="messages-cont w-full overflow-y-scroll h-full flex">
                <div className="messages-left relative w-sm dark:border-r-neutral-800 border-r py-4">
                    <div className="header-messages-left flex flex-col gap-6 border-b dark:border-b-neutral-800 pb-4 px-7">
                        <h2 className="text-2xl font-bold">Mensajes</h2>
                        <div className="p-1 dots-containerp-3 z-10 absolute top-4 right-4 text-neutral-600 hover:text-neutral-200 hover:bg-neutral-900 cursor-pointer transition-colors duration-200 rounded-xs">
                            <EllipsisVertical className="" />
                        </div>
                        <div className="input-friends h-12 w-full border dark:border-neutral-800 rounded-md relative">
                            <Search className="absolute top-3 left-2.5 text-neutral-600  size-5" />
                            <input type="text" placeholder="Buscar conversaciones..." className="w-full h-full pl-10 outline-0" value={searchChatInput} onChange={(e) => setSearchChatInput(e.target.value)} />
                        </div>
                    </div>
                    <div className="messages-chats">
                        {searchChat(searchChatInput).map((user) => {
                            return (
                                <Chat key={user.id} name={user.name} lastMessage={user.lastMessage} online={user.online} chatId={user.id} />
                            )
                        })}
                    </div>
                </div>
                <div className="messages-right w-full flex flex-col">
                    <div className="messages-right-head py-2 px-4 relative w-full border-b dark:border-b-neutral-900 pb-2">
                        <div className="user flex gap-3 items-center">
                            <div className="avatar relative">
                                <Avatar className="rounded-full size-12">
                                    <AvatarFallback>
                                        <img src={PlaceHolder} alt="Placeholder" />
                                    </AvatarFallback>
                                    <AvatarImage src={PlaceHolder} alt="Placeholder" />
                                </Avatar>
                            </div>
                            <div className="user-info">
                                <h2 className="font-semibold">{chat?.name}</h2>
                                <p className="text-sm text-neutral-400">{chat?.online}</p>
                            </div>
                        </div>
                        <div className="p-1 dots-containerp-3 z-10 absolute top-4 right-4 text-neutral-600 hover:text-neutral-200 hover:bg-neutral-900 cursor-pointer transition-colors duration-200 rounded-xs">
                            <EllipsisVertical className="" />
                        </div>
                    </div>
                    <div ref={messageContainerRef} className="messages-container flex-1 p-4 overflow-y-auto">
                        <Message name={chat?.name} pfp='/placeholder.webp' message={chat?.lastMessage} isMine={false} />
                        {chatHistory.map(message => <Message isMine={true} message={message.content} name='Me' key={message.id} pfp='/placeholder.webp' />)}
                    </div>
                    <div className="messages-input w-full gap-2 border-t h-15 items-center px-4 dark:border-t-neutral-900 flex">
                        <div className="btn-container p-2 h-max w-max text-neutral-600 hover:bg-neutral-800 hover:text-neutral-200 rounded-sm cursor-pointer transition-colors duration-200">
                            <Paperclip className="size-5" />
                        </div>
                        <div className="btn-container p-2 h-max w-max text-neutral-600 hover:bg-neutral-800 hover:text-neutral-200 rounded-sm cursor-pointer transition-colors duration-200">
                            <Image className="size-5" />
                        </div>
                        <div className="btn-container p-2 h-max w-max text-neutral-600 hover:bg-neutral-800 hover:text-neutral-200 rounded-sm cursor-pointer transition-colors duration-200">
                            <Mic className="size-5" />
                        </div>
                        <div className="input-container w-full border dark:border-neutral-800 rounded-sm h-3/4">
                            <input type="text" className="w-full h-full outline-0 px-4" placeholder="Escribe un mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSendMessage(message, chatHistory, setChatHistory, setMessage)} />
                        </div>
                        <div className="btn-container p-2 transition-colors duration-200 bg-blue-600 rounded-sm h-max w-max cursor-pointer hover:bg-blue-500 active:bg-blue-600 text-white" onClick={() => onSendMessage(message, chatHistory, setChatHistory, setMessage)}>
                            <Send className="size-5" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages