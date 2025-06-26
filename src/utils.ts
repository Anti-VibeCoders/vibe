import type { Notificacion, TipoNotificacion } from "./types";

const tiposValidos: TipoNotificacion[] = ["mensaje", "like", "seguidor", "comentario"];

export const isNotification = (n: unknown): n is Notificacion => {
  if (typeof n !== "object" || n === null) return false;
  const obj = n as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    typeof obj.titulo === "string" &&
    typeof obj.descripcion === "string" &&
    typeof obj.leido === "boolean" &&
    typeof obj.tipo === "string" &&
    tiposValidos.includes(obj.tipo as TipoNotificacion) &&
    typeof obj.fecha === "string" &&
    (typeof obj.avatarUrl === "undefined" || typeof obj.avatarUrl === "string")
  );
};
