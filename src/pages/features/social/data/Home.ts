import type { Post } from "@/common/types/post"

export const postsFetch = async (setLoading : React.Dispatch<React.SetStateAction<boolean>>, setPosts: React.Dispatch<Post[]>) => {
    setLoading(true)
    try {
        const response = await fetch("http://127.0.0.1:8000/api/publications/")
        if (response.ok) {
            const data = await response.json()
            setPosts(data)
        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}