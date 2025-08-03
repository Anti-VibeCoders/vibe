import type { Post } from "@/common/types/post"

export const examplePosts: Post[] = [
    {
        id: 1,
        user: 'JunLovin',
        avatarImage: 'https://cdn.pfps.gg/pfps/37007-weird-eyes-cat.gif',
        created_at: "2025-07-30T10:15:00Z",
        image: 'https://i.pinimg.com/originals/1f/a2/2b/1fa22befc10e3cbacd58c5b407a97997.gif',
        content: '¡Que viva la programación! ✨',
        isVerified: true,
    },
    {
        id: 2,
        user: 'RamCode',
        avatarImage: 'https://syntax-world-workspace.vercel.app/team/aram.webp',
        image: '/placeholder.webp',
        created_at: "2025-02-20T12:15:00Z",
        content: 'Miren mi obra de alte :v',
        isVerified: true,
    },
    {
        id: 3,
        user: 'Lobosanplay',
        avatarImage: 'https://syntax-world-workspace.vercel.app/team/lobo.webp',
        created_at: "2025-05-20T12:15:00Z",
        image: './placeholder.webp',
        content: 'Viva la programación',
        isVerified: false,
    },
    {
        id: 4,
        user: 'Jota',
        avatarImage: 'https://syntax-world-workspace.vercel.app/team/jota.webp',
        created_at: "2024-05-20T05:15:00Z",
        image: 'https://netit.bg/wp-content/uploads/2019/04/bannerC.png',
        content: 'Viva C#',
        isVerified: false,
    },
]

export const defaultPostValues: Partial<Post> = {
    user: "Usuario Vibe",
    avatarImage: "https://github.com/shadcn.png",
    image: "/placeholder.webp",
    isVerified: false
}

export const findById = (id: number | string) => {
    if (typeof id === 'string') {
        return examplePosts.find(post => post.id === parseInt(id))
    }

    return examplePosts.find(post => post.id === id)
}

// . Llamada a la API para Posts