export type TipoNotificacion = "mensaje" | "like" | "seguidor" | "comentario";

export type Notificacion = {
        id: string;
        titulo: string;
        descripcion: string;
        leido: boolean;
        tipo: TipoNotificacion;
        fecha: string;
        avatarUrl?: string;
};
export type Message = {
    id: number;
    name: string;
    lastMessage: string;
    date: string;
    online: boolean;
}