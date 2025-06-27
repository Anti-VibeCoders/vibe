import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { MessageCircle, Heart, UserPlus, MessageSquare } from "lucide-react";
import type { Notificacion } from "@/types";
import { isNotification } from "@/utils";

interface NotificationsProps {
  className?: string;
}

function Notifications({ className = "" }: NotificationsProps) {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarNotificaciones = async () => {
    try {
      setLoading(true);
      const response = {
        data: [
          {
            id: "notif-001",
            titulo: "Nuevo mensaje",
            descripcion: "Tienes un mensaje de Juan Pérez en tu bandeja",
            leido: false,
            tipo: "mensaje",
            fecha: "2023-11-20T14:30:00Z",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            id: "notif-002",
            titulo: "Nuevo like",
            descripcion: "A María Gómez le gustó tu publicación 'Vacaciones en la playa'",
            leido: false,
            tipo: "like",
            fecha: "2023-11-20T12:15:00Z",
            avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            id: "notif-003",
            titulo: "Nuevo seguidor",
            descripcion: "Carlos Rodríguez empezó a seguirte",
            leido: true,
            tipo: "seguidor",
            fecha: "2023-11-19T09:45:00Z",
            avatarUrl:
              "https://media.discordapp.net/attachments/1363908342912782427/1379252687266381916/1746283853991.png",
          },
        ],
      };

      if (Array.isArray(response.data) && response.data.every(isNotification)) {
        setNotificaciones(response.data as Notificacion[]);
      } else {
        throw new Error("Error al cargar notificaciones");
      }
    } catch (err) {
      setError("Error al cargar notificaciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLeido = async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setNotificaciones((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, leido: true } : notif
        )
      );
    } catch (err) {
      console.error("Error al marcar como leído", err);
    }
  };

  useEffect(() => {
    cargarNotificaciones();
    const interval = setInterval(cargarNotificaciones, 60000);
    return () => clearInterval(interval);
  }, []);

  const calcularTiempo = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    const ahora = new Date();
    const diferencia = ahora.getTime() - fecha.getTime();

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (segundos < 60) return "hace un momento";
    if (minutos < 60) return `hace ${minutos} minuto${minutos !== 1 ? "s" : ""}`;
    if (horas < 24) return `hace ${horas} hora${horas !== 1 ? "s" : ""}`;
    return `hace ${dias} día${dias !== 1 ? "s" : ""}`;
  };

  if (loading) return <div className="text-muted-foreground p-4">Cargando notificaciones...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className={`w-full max-w-3xl mx-auto px-4 py-6 overflow-scroll ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Notificaciones</h2>

      <div className="flex flex-col gap-4">
        {notificaciones.map((notif) => (
          <section
            key={notif.id}
            onClick={() => !notif.leido && marcarComoLeido(notif.id)}
            className={`relative flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-2xl border transition-shadow duration-200 cursor-pointer ${
              notif.leido
                ? "bg-gray-950 hover:shadow-md"
                : "bg-gray-900/20 hover:shadow-lg"
            }`}
          >
            <Avatar className="w-12 h-12 shrink-0">
              <AvatarImage src={notif.avatarUrl} />
              <AvatarFallback>{notif.titulo.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
                {notif.titulo}
              </h3>
              <p className="text-sm text-muted-foreground mb-2 break-words">
                {notif.descripcion}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {notif.tipo === "mensaje" && <MessageCircle className="w-5 h-5 text-blue-500" />}
                {notif.tipo === "like" && <Heart className="w-5 h-5 text-pink-500" />}
                {notif.tipo === "seguidor" && <UserPlus className="w-5 h-5 text-green-500" />}
                {notif.tipo === "comentario" && <MessageSquare className="w-5 h-5 text-yellow-500" />}
                <time className="ml-auto text-xs whitespace-nowrap">{calcularTiempo(notif.fecha)}</time>
              </div>
            </div>

            {!notif.leido && (
              <div className="absolute top-3 right-3 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
