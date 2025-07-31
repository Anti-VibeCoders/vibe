export const loadFollow = async (setFollowing: any, setError: any, setLoading: any) => {
    try {
        const response = {
            data: [
                {
                    id: 0,
                    avatarUser: "https://randomuser.me/api/portraits/men/32.jpg",
                    backgroundUser: "https://images.unsplash.com/photo-1542676032-6e468ada2953?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    username: "Juanito Perez",
                    follow: "True",
                },
                {
                    id: 1,
                    avatarUser: "https://randomuser.me/api/portraits/women/44.jpg",
                    backgroundUser: "https://images.unsplash.com/photo-1543253539-58c7d1c00c8a?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    username: "Anita perez",
                    follow: "True",
                },
                {
                    id: 3,
                    avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                    backgroundUser: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    username: "Said Ruíz",
                    follow: "True",
                },
                {
                    id: 4,
                    avatarUser: "https://randomuser.me/api/portraits/lego/2.jpg",
                    backgroundUser: "https://images.unsplash.com/photo-1548983965-416c1920352e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    username: "Santiago espárrago",
                    follow: "True",
                },
            ]
        };
        setFollowing(
            response.data.map((follow: any) => ({
                ...follow,
            })))
    } catch (err) {
        setError("Error al cargar Usuarios");
        console.error(err);
    } finally {
        setLoading(false);
    }
}