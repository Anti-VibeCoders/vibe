import type { SetStateAction } from "react"
import type { ChatsType } from "../types/chat"
import type { IndividualChatType } from "../types/individualChat"

export const chats: ChatsType[] = [
    {
        id: 1,
        name: "Juan Perez",
        lastMessage: "Hola, como estas?",
        date: "10:00",
        online: true
    },
    {
        id: 2,
        name: "Pedro Perez",
        lastMessage: "Perfecto, nos vemos mañana",
        date: "10:00",
        online: false
    },
    {
        id: 3,
        name: "Maria Perez",
        lastMessage: "Gracias por la información",
        date: "10:00",
        online: true
    },
    {
        id: 4,
        name: "Luis Perez",
        lastMessage: "¿Has visto el nuevo proyecto?",
        date: "10:00",
        online: false
    }
]

export const individualChat = [
    {
        id: 1,
        content: 'Hola',
        isMine: true
    }
]

// ---------- FUNCTIONS ---------- 

export const getChatById = (id: number | string) => {
    if (typeof id === 'string') {
        return chats.find(chat => chat.id === parseInt(id))
    }
    return chats.find(chat => chat.id === id)
}

export const onSendMessage = (message: string, chatHistory: IndividualChatType[], setChatHistory: React.Dispatch<SetStateAction<IndividualChatType[]>>, setMessage: React.Dispatch<SetStateAction<string>>) => {
    if (message.length === 0) return
    setChatHistory((prev: IndividualChatType[]) => [...prev, { id: chatHistory.length + 1, content: message, isMine: true }])
    setMessage('')
}

export const searchChat = (searchChatInput: string) => {
    const terms = searchChatInput.split(" ")
    return chats.filter(chat => terms.every(term => Object.values(chat).some(value => value.toString().toLowerCase().includes(term))))
}