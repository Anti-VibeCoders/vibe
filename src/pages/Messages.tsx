import { EllipsisVertical, Search, ArrowLeft } from 'lucide-react';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import ConversationCard from '@/components/ConversationCard';

const mensajes = [
  { id: 1, name: "Juan Perez", lastMessage: "Hola, como estas?", date: "10:00", online: true },
  { id: 2, name: "Pedro Perez", lastMessage: "Perfecto, nos vemos mañana", date: "10:00", online: false },
  { id: 3, name: "Maria Perez", lastMessage: "Gracias por la información", date: "10:00", online: true },
  { id: 4, name: "Luis Perez", lastMessage: "¿Has visto el nuevo proyecto?", date: "10:00", online: false }
];

function Messages() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isInChat = location.pathname.startsWith("/home/messages/") && id;

  return (
    <div className="flex w-full h-full">
      <div className={`md:flex flex-col w-full md:w-1/3 lg:w-1/4 border-r dark:border-r-neutral-800 py-4 ${isInChat ? 'hidden' : 'flex'}`}>
        <div className="flex flex-col gap-6 border-b dark:border-b-neutral-800 pb-4 px-4">
          <h2 className="text-2xl font-bold">Mensajes</h2>
          <div className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-200 hover:bg-neutral-900 cursor-pointer transition-colors duration-200 rounded-xs p-1">
            <EllipsisVertical />
          </div>
          <div className="relative h-12 w-full border dark:border-neutral-800 rounded-md">
            <Search className="absolute top-3 left-2.5 text-neutral-600 size-5" />
            <input type="text" placeholder="Buscar conversaciones..." className="w-full h-full pl-10 outline-0" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mensajes.map((user) => (
            <ConversationCard
              key={user.id}
              name={user.name}
              lastMessage={user.lastMessage}
              online={user.online}
              conversationID={user.id}
            />
          ))}
        </div>
      </div>
        {isInChat && (
      <div className='flex w-full md:w-2/3 lg:w-3/4 h-full relative'>
            <div className="md:hidden">
            <button
                className="absolute top-3 left-2 p-2 text-white hover:text-white/60 z-50 hover:cursor-pointer"
                onClick={() => navigate("/home/messages")}>
                <ArrowLeft className="w-6 h-6" />
            </button>

            </div>
        <Outlet />
      </div>
        )}
    </div>
  );
}

export default Messages;
