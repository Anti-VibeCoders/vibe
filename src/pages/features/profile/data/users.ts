export const usersExample = [
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
    },
    {
        id: 3,
        name: "Santiago Parra",
        username: "Lobosanplay",
        bio: "Me gusta el café",
        location: "Una Isla",
        website: "https://github.com/lobosanplay",
        joinDate: "Jun 2025",
        avatar: "https://syntax-world-workspace.vercel.app/team/lobo.webp",
        coverImage: "https://i.ytimg.com/vi/t6ntM3mNbWU/maxresdefault.jpg",
        followers: 0,
        following: 300,
        posts: 50,
        verified: false,
    },
    {
        id: 4,
        name: "Jeferson Ramos",
        username: "Jota",
        bio: "Viva C#",
        location: "Colombia",
        website: "https://github.com/Jramosd-lang",
        joinDate: "Abr 2025",
        avatar: "https://syntax-world-workspace.vercel.app/team/jota.webp",
        coverImage: "https://netit.bg/wp-content/uploads/2019/04/bannerC.png",
        followers: 200,
        following: 50,
        posts: 90,
        verified: false,
    },
]

export const getUserById = (id: number | string) => {
    if (typeof id === 'string') {
        return usersExample.find(user => user.id === parseInt(id))
    }
    return usersExample.find(user => user.id === id)
}