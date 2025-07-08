import App from './App'
import Error from '@/pages/Error'
import Register from '@/pages/Register'
import Restore from '@/pages/Restore'
import Messages from '@/pages/Messages'
import Profile from '@/pages/Profile'
import SidenavLayout from '@/layout/SidenavLayout'
import Notifications from '@/pages/Notifications'
<<<<<<< HEAD
import NewPost from './pages/NewPost'
import Friends from './pages/Friends'
import Chat from '@/pages/Chat';
=======
import Following from '@/pages/Following'
import { Children } from 'react'
import path from 'path'

>>>>>>> be6c850 (Creacion de la pagina Following y estilo base de los contenedores de los usuarios)
const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: '/home',
        element: <SidenavLayout />,
        errorElement: <Error />,
        children: [
            {
                path: 'messages',
                element: <Messages />,
                children: [
                    {
                        path: ':id',
                        element: <Chat />
                    }
                ]
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'notifications',
                element: <Notifications />
            },
            {
<<<<<<< HEAD
<<<<<<< HEAD
                path: "newpost",
                element: <NewPost/>
            },
            {
                path: "friends",
                element: <Friends/>
=======
                path: 'following',
                element: <Following />
>>>>>>> be6c850 (Creacion de la pagina Following y estilo base de los contenedores de los usuarios)
=======
                path: 'following/:id',
                element: <Following/>
>>>>>>> 11e50e3 (cambio en la ruta ahora se accede a la pagina de siguiendo en perfil en el apartado de siguiendo y se le añadio un hover a ese mismo texto)
            }
        ]
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <Error />
    },
    {
        path: '/restore',
        element: <Restore />,
        errorElement: <Error />
    }
]

export default routes