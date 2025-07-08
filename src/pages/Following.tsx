import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

function Following(){
    type followings = {
        id: number;
        avatarUser: string;
        username: string;
        follow: boolean;
    }

    const [following, setFollowing] = useState<followings[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Datos de backends
    const loadFollow = async () =>{
        try {
        const response = {
            data: [
            {
                id: 0,
                avatarUser: "https://randomuser.me/api/portraits/men/32.jpg",
                username: "Juanito Perez",
                follow: "True",
            },
            {
                id: 1,
                avatarUser: "https://randomuser.me/api/portraits/women/44.jpg",
                username: "Anita perez",
                follow: "True",
            },
            {
                id: 3,
                avatarUser: "https://randomuser.me/api/portraits/men/53.jpg",
                username: "Said Ruíz",
                follow: "True",
            },
        ]
        };
        //Traferencia de los datos al atributo following del componente
        setFollowing(
                response.data.map((follow: any) => ({
                    ...follow,
                })))

    }catch (err) {
            setError("Error al cargar Usuarios");
            console.error(err);
        } finally {
            setLoading(false);
        }
    } 

    useEffect(() => {
        loadFollow();

        // Opcional: Configurar polling o WebSocket para actualizaciones
        const interval = setInterval(loadFollow, 60000); // Actualizar cada minuto

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    
    return (
    <>
    <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col gap-4 w-3/4">
            {following.map((follow) => (
            <div className="flex justify-between items-center w-full h-auto bg-zinc-900 rounded-lg p-4 border-neutral-500 border-1">
            <div className="flex flex-1 gap-5 items-center w-full">
                <Avatar className="w-15 h-15">
                 <AvatarImage src={follow.avatarUser} />
                  </Avatar>
                <b className="text-lg font-semibold">{follow.username}</b>
            </div>
           <button
            className="bg-blue-500 px-4 py-2  rounded-md text-black text-sm font-semibold"
            >Siguiendo</button>
        </div>
        ))}
        </div>
        
    </div>
    </>
    )
}

export default Following