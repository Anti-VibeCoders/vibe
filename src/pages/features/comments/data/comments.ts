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

export const loadComments = async (setLoading: any, setComment: any) => {
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/comments/")
        if (response.ok) {
            const data = await response.json()
            setComment(data)
        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

export const createComment = async (commentContent: string, setCommentContent: React.Dispatch<React.SetStateAction<string>>) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/comments/create/", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${JSON.parse(localStorage.getItem('token')!)}`
                },
                body: JSON.stringify({
                    content: commentContent,
                })
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                setCommentContent('')
            } else {
                console.error("Error en el servidor: ", data)
                console.log("Status: ", response.status)
            }
        } catch (error) {
            console.error(error)
        }
    }
