import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

function Following(){
    type followings = {
        id: number;
        avatarUser: string;
        backgroundUser: string;
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
                username: "Satiago espárrago",
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
    <div className="flex flex-col gap-4 my-6 items-center w-full h-full">
        <div className="flex w-3/4 bg-[#1a1a1a6b] rounded-lg items-center p-2">
         <svg
           xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 text-gray-300">
           <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
        </svg>
        <input
        type="text"
        className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 w-full ml-3"
        placeholder="Buscar a un usuario..."
        />
        </div>


        <div className="flex flex-col gap-4 w-3/4">
            {following.map((follow) => (
          <div
            key={follow.id}
            className="group relative flex justify-between items-center w-full h-auto bg-zinc-900 rounded-lg p-4 border border-neutral-500 overflow-hidden"
          >
            {follow.backgroundUser && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{ backgroundImage: `url(${follow.backgroundUser})` }}
              />
            )}

            <div className="relative z-10 flex flex-1 gap-5 items-center w-full">
              <Avatar className="w-15 h-15">
                <AvatarImage src={follow.avatarUser} />
              </Avatar>
              <b className="text-lg font-semibold">{follow.username}</b>
            </div>

            <button 
            className="relative z-10 bg-blue-500 px-4 py-2 rounded-md text-black text-sm font-semibold">
              Siguiendo
            </button>
          </div>
        ))}
        </div>
        
    </div>
    </>
    )
}

export default Following