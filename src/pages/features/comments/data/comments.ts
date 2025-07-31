export const maxChars = 280

export const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setInputValue: any, setCharCount: any) => {
    const content = e.target.value;
    if (content.length <= maxChars) {
        setInputValue(content);
        setCharCount(content.length);
    }
};

export const handleEmojiSelect = (setInputValue: any, setCharCount: any, emoji?: string) => {
    setInputValue((prev: string) => {
        const newValue = prev + emoji;
        if (newValue.length <= maxChars) {
            setCharCount(newValue.length);
            return newValue;
        }
        return prev;
    });
};

export const loadComments = async (setLoading: any, setComment: any, setError: any) => {
    setLoading(true)
    try {
        const response = {
            data: [
                {
                    id: 0,
                    username: "Juanito Perez",
                    avatarUser: "https://randomuser.me/api/portraits/men/32.jpg",
                    body: "Donde se encuentra ese museo",
                    like: 23,
                    date: "2024-11-20T12:15:00Z",
                },
                {
                    id: 1,
                    username: "Anita perez",
                    avatarUser: "https://randomuser.me/api/portraits/women/44.jpg",
                    body: "Kirby es super Cuuuuuuuute!! 😍😍😍",
                    like: 56,
                    date: "2025-05-20T12:15:00Z",
                },
                {
                    id: 2,
                    username: "Said Ruíz",
                    avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                    body: "De hecho el nombre kirby fue elegido por Shigeru Miyamoto por su sonoridad y porque se asemejaba a la personalidad del personaje. Curiosamente, el nombre también está vinculado a una disputa legal entre Nintendo y el abogado John Kirby.",
                    like: 34,
                    date: "2025-07-08T12:15:00Z",
                },
                {
                    id: 3,
                    username: "Santiago espárrago",
                    avatarUser: "https://randomuser.me/api/portraits/lego/2.jpg",
                    body: "Nah esa cosa es re horrible, ademas me quiero dar un tiro >:C",
                    like: 13,
                    date: "2024-09-20T12:15:00Z",
                },
                {
                    id: 4,
                    username: "Said Ruíz",
                    avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                    body: "El verdadero kirby modo zelda",
                    like: 46,
                    date: "2025-03-18T12:15:00Z",
                },
            ]
        }
        setComment(
            response.data.map((cmt) => ({
                ...cmt,
                activated: false
            })))
    } catch (err) {
        setError("Error en los comentarios");
        console.error(err);
    } finally {
        setLoading(false);
    }
}
