export const postsByUserExample = [
    {
        id: 1,
        name: "Said Ruíz",
        username: "JunLovin",
        bio: "Viva la organización - CEO de Vibe",
        location: "Ecuador",
        website: "https://said-coverletter.vercel.app",
        joinDate: "Jul 2025",
        avatar: "https://cdn.pfps.gg/pfps/37007-weird-eyes-cat.gif",
        coverImage: "https://pbs.twimg.com/profile_banners/1883983937933897728/1751037972/1500x500",
        followers: 9999,
        following: 1,
        posts: 3,
        verified: true,
        post: [
            {
                id: 1,
                user: 'JunLovin',
                avatarImage: 'https://cdn.pfps.gg/pfps/37007-weird-eyes-cat.gif',
                date: '2025-07-30T10:15:00Z',
                image: 'https://i.pinimg.com/originals/1f/a2/2b/1fa22befc10e3cbacd58c5b407a97997.gif',
                description: '¡Que viva la programación! ✨',
                isVerified: true
            },
            {
                id: 2,
                user: 'JunLovin',
                avatarImage: 'https://cdn.pfps.gg/pfps/37007-weird-eyes-cat.gif',
                date: '2025-07-30T10:15:00Z',
                image: '/placeholder.webp',
                description: 'Mi segundo post',
                isVerified: true
            }
        ]
    },
    {
        id: 2,
        name: "Aram Musset",
        username: "RamCode",
        bio: "Soy feliz :D",
        location: "República Dominicana (una isla)",
        website: "https://github.com/RamCodeZ3",
        joinDate: "May 2025",
        avatar: "https://syntax-world-workspace.vercel.app/team/aram.webp",
        coverImage: "/placeholder.webp",
        followers: 2,
        following: 400,
        posts: 8,
        verified: true,
        post: [
            {
                id: 1,
                user: 'RamCode',
                avatarImage: 'https://syntax-world-workspace.vercel.app/team/aram.webp',
                image: '/placeholder.webp',
                date: "2025-02-20T12:15:00Z",
                description: 'Miren mi obra de alte :v',
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
            }
        ]
    }
]

export const getPostsById = (id: number | string) => {
    if (typeof id === 'string') {
        return postsByUserExample.find((user) => user.id === parseInt(id))
    }
    return postsByUserExample.find((user) => user.id === id)
}