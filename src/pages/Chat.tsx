import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, Image, Mic, Send, EllipsisVertical } from 'lucide-react';
import Message from '@/components/Message';
import type { Message as MessageType } from '@/types';
import PlaceHolder from '@/../public/placeholders/placeholder-icon.svg';

const mensajes: MessageType[] = [
  { id: 1, name: "Juan Perez", lastMessage: "Hola, como estas?", date: "5:00", online: true },
  { id: 2, name: "Pedro Perez", lastMessage: "Perfecto, nos vemos mañana", date: "1:00", online: false },
  { id: 3, name: "Maria Montero", lastMessage: "Estoy sola en casa uwu", date: "11:00", online: true },
  { id: 4, name: "Luis Perez", lastMessage: "¿Has visto el nuevo proyecto?", date: "3:00", online: false }
];

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // de momento estos datos pq no hay backend xd
    const selected = mensajes.find((m) => m.id === Number(id));
    if (selected) {
      setMessages([selected]);
    }
  }, [id]);

  const sendMessage = () => {
    if (!message) return;
    const data: MessageType = {
      id: Date.now(),
      name: 'yo',
      lastMessage: message,
      date: new Date().toLocaleTimeString(),
      online: true,
    };
    setMessages((prev) => [...prev, data]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="py-2 px-4 relative border-b dark:border-b-neutral-900">
        <div className="ml-10 md:m-0 flex gap-3 items-center">
          <Avatar className="rounded-full size-12">
            <AvatarFallback>
              <img src={PlaceHolder} alt="Placeholder" />
            </AvatarFallback>
            <AvatarImage src={PlaceHolder} alt="Placeholder" />
          </Avatar>
          <div>
            <h2 className="font-semibold">Usuario {id}</h2>
            <p className="text-sm text-neutral-400">En línea</p>
          </div>
          <div className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-200 hover:bg-neutral-900 cursor-pointer transition-colors duration-200 rounded-xs p-1">
            <EllipsisVertical />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg.lastMessage}
            pfp={PlaceHolder}
            name={msg.name}
            isMine={msg.name === 'yo'}
            date={msg.date}
          />
        ))}
      </div>
      <div className="w-full gap-2 border-t h-15 items-center px-4 dark:border-t-neutral-900 flex flex-wrap md:flex-nowrap py-2">
        <div className="p-2 text-neutral-600 hover:bg-neutral-800 hover:text-neutral-200 rounded-sm cursor-pointer">
          <Paperclip className="size-5" />
        </div>
        <div className="p-2 text-neutral-600 hover:bg-neutral-800 hover:text-neutral-200 rounded-sm cursor-pointer">
          <Image className="size-5" />
        </div>
        <div className="p-2 text-neutral-600 hover:bg-neutral-800 hover:text-neutral-200 rounded-sm cursor-pointer">
          <Mic className="size-5" />
        </div>
        <div className="flex-1 border dark:border-neutral-800 rounded-sm h-10 mt-2 md:mt-0">
          <input
            type="text"
            className="w-full h-full outline-0 px-4"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
        </div>
        <div className="p-2 bg-blue-600 rounded-sm cursor-pointer hover:bg-blue-500 active:bg-blue-600 text-white mt-2 md:mt-0" onClick={sendMessage}>
          <Send className="size-5" />
        </div>
      </div>
    </div>
  );
}

export default Chat;