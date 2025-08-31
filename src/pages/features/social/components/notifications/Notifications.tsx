import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar";
import { useState, useEffect } from "react";
import { MessageCircle, Heart, UserPlus, MessageSquare } from "lucide-react";

interface NotificationsProps {
    className?: string;
}

function Notifications({ className = "" }: NotificationsProps) {
    type TipoNotificacion = "mensaje" | "like" | "seguidor" | "comentario";

    type Notificacion = {
        id: string;
        titulo: string;
        descripcion: string;
        leido: boolean;
        tipo: TipoNotificacion;
        fecha: string;
        avatarUrl?: string;
    };

    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para cargar notificaciones desde el backend
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
                        descripcion:
                            "A María Gómez le gustó tu publicación 'Vacaciones en la playa'",
                        leido: false,
                        tipo: "like",
                        fecha: "2023-11-20T12:15:00Z",
                        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
                    },
                    {
                        id: "notif-003",
                        titulo: "Nuevo seguidor",
                        descripcion: "Carlos Rodríguez empezó a seguirte",
                        leido: true, // Esta notificación ya está marcada como leída
                        tipo: "seguidor",
                        fecha: "2023-11-19T09:45:00Z",
                        avatarUrl:
                            "https://randomuser.me/api/portraits/women/44.jpg",
                    },
                ],
            };
            setNotificaciones(
                response.data.map((notif: any) => ({
                    ...notif,
                    fecha: new Date(notif.fecha),
                }))
            );
        } catch (err) {
            setError("Error al cargar notificaciones");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Función para marcar como leído
    const marcarComoLeido = async (id: string) => {
        try {
            console.log(`Simulando PATCH /notificaciones/${id}/marcar-leido`);

            await new Promise((resolve) => setTimeout(resolve, 300)); // Simula delay de red

            // Actualización optimista del estado local
            setNotificaciones((prev) =>
                prev.map((notif) =>
                    notif.id === id ? { ...notif, leido: true } : notif
                )
            );
        } catch (err) {
            console.error("Error al marcar como leído", err);
        }
    };

    // Cargar notificaciones al montar el componente
    useEffect(() => {
        cargarNotificaciones();

        // Opcional: Configurar polling o WebSocket para actualizaciones
        const interval = setInterval(cargarNotificaciones, 60000); // Actualizar cada minuto

        return () => clearInterval(interval);
    }, []);

    // Función para calcular tiempo transcurrido
    const calcularTiempo = (fechaStr: string) => {
        const fecha = new Date(fechaStr);
        const ahora = new Date();
        const diferencia = ahora.getTime() - fecha.getTime();

        const segundos = Math.floor(diferencia / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (segundos < 60) return "hace un momento";
        if (minutos < 60)
            return `hace ${minutos} minuto${minutos !== 1 ? "s" : ""}`;
        if (horas < 24) return `hace ${horas} hora${horas !== 1 ? "s" : ""}`;
        return `hace ${dias} día${dias !== 1 ? "s" : ""}`;
    };

    if (loading) return <div>Cargando notificaciones...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className={`notifications__container ${className}`}>
            {notificaciones.map((notif) => (
                <section
                    key={notif.id}
                    className={`notifications__card ${notif.leido ? "leido" : "no-leido"
                        }`}
                    onClick={() => !notif.leido && marcarComoLeido(notif.id)}
                >
                    <Avatar className="notifications__avatar">
                        <AvatarImage src={notif.avatarUrl} />
                        <AvatarFallback>{notif.titulo.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="notifications__content">
                        <h3 className="font-semibold text-[1.5em] text-foreground mb-1">
                            {notif.titulo}
                        </h3>
                        <p className="text-[90%] text-muted-foreground mb-2">
                            {notif.descripcion}
                        </p>
                        <span className="notification-type">
                            {notif.tipo === "mensaje" && (
                                <MessageCircle className="size-6 text-blue-500 inline-block align-middle" />
                            )}
                            {notif.tipo === "like" && (
                                <Heart className="size-6 text-pink-500 inline-block align-middle" />
                            )}
                            {notif.tipo === "seguidor" && (
                                <UserPlus className="size-6 text-green-500 inline-block align-middle" />
                            )}
                            {notif.tipo === "comentario" && (
                                <MessageSquare className="size-6 text-yellow-500 inline-block align-middle" />
                            )}
                        </span>
                        <time className="notifications_cardTime">
                            {calcularTiempo(notif.fecha)}
                        </time>
                    </div>

                    {!notif.leido && <div className="notification-badge"></div>}
                </section>
            ))}
        </div>
    );
}

export default Notifications;