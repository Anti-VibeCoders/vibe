export const chats = [
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

export const getChatById = (id: number | string) => {
    if (typeof id === 'string') {
        return chats.find(chat => chat.id === parseInt(id))
    }
    return chats.find(chat => chat.id === id)
}