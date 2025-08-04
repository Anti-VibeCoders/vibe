import type { NavigateFunction } from "react-router-dom"

export const sidenavLinks = [
    {
        link: '/home',
        icon: 'Home',
        text: 'Inicio'
    },
    {
        link: 'explore',
        icon: 'Compass',
        text: 'Explorar'
    },
    {
        link: 'notifications',
        icon: 'Bell',
        text: 'Notificaciones'
    },
    {
        link: 'messages/1',
        icon: 'MessageSquare',
        text: 'Mensajes'
    },
    {
        link: 'profile/1',
        icon: 'User',
        text: 'Perfil'
    },
    {
        link: 'configuration',
        icon: 'Bolt',
        text: 'Configuración'
    },
]

export const userSignOut = (navigate: NavigateFunction) => {
    navigate('/')
    localStorage.removeItem('token')
}