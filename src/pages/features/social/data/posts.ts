import type { Post } from "@/common/types/post"

export const examplePosts: Post[] = [
    {
        id: 1,
        user: 'JunLovin',
        avatarImage: 'https://cdn.pfps.gg/pfps/37007-weird-eyes-cat.gif',
        date: "2025-07-30T10:15:00Z",
        image: 'https://i.pinimg.com/originals/1f/a2/2b/1fa22befc10e3cbacd58c5b407a97997.gif',
        description: '¡Que viva la programación! ✨',
        isVerified: true,
    },
    {
        id: 2,
        user: 'RamCode',
        avatarImage: 'https://syntax-world-workspace.vercel.app/team/aram.webp',
        image: '/placeholder.webp',
        date: "2025-02-20T12:15:00Z",
        description: 'Miren mi obra de alte :v',
        isVerified: true,
    },
    {
        id: 3,
        user: 'Lobosanplay',
        avatarImage: 'https://syntax-world-workspace.vercel.app/team/lobo.webp',
        date: "2025-05-20T12:15:00Z",
        image: 'https://i.ytimg.com/vi/t6ntM3mNbWU/maxresdefault.jpg',
        description: 'Me quiero matar, soy gay.',
        isVerified: false,
    },
    {
        id: 4,
        user: 'Jota',
        avatarImage: 'https://syntax-world-workspace.vercel.app/team/jota.webp',
        date: "2024-05-20T05:15:00Z",
        image: 'https://netit.bg/wp-content/uploads/2019/04/bannerC.png',
        description: 'Los pythoncoders son gays @Lobosanplay. Viva C#',
        isVerified: false,
    },
]

export const findById = (id: number | string) => {
    if (typeof id === 'string') {
        return examplePosts.find(post => post.id === parseInt(id))
    }

    return examplePosts.find(post => post.id === id)
}