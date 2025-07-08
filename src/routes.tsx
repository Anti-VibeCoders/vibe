import App from './App'
import Error from '@/pages/Error'
import Register from '@/pages/Register'
import Restore from '@/pages/Restore'
import Messages from '@/pages/Messages'
import Profile from '@/pages/Profile'
import SidenavLayout from '@/layout/SidenavLayout'
import Notifications from '@/pages/Notifications'
<<<<<<< HEAD
<<<<<<< HEAD
import NewPost from './pages/NewPost'
import Friends from './pages/Friends'
import Chat from '@/pages/Chat';
=======
import Following from '@/pages/Following'
import { Children } from 'react'
import path from 'path'
=======
import NewPost from './pages/NewPost'
import Config from './pages/Config'
import Following from './pages/Following'
<<<<<<< HEAD
>>>>>>> 3809200 (fix: keep staged changes with the new changes in)
=======
import Saved from './pages/Saved'
import Explore from './pages/Explore'
import FollowingPost from './pages/FollowingPost'
<<<<<<< HEAD
>>>>>>> de3925d (feat: add new routes for: saved, following, explore, etc.)
=======
import Comments from './pages/Comments'
>>>>>>> c2b8c38 (Creacion del componente Comments, donde se vera los comentarios de la publicaciones.)

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
<<<<<<< HEAD
>>>>>>> 11e50e3 (cambio en la ruta ahora se accede a la pagina de siguiendo en perfil en el apartado de siguiendo y se le añadio un hover a ese mismo texto)
=======
            },
            {
                path: 'new-post',
                element: <NewPost/>,
            },
            {
                path: 'configuration',
                element: <Config />
<<<<<<< HEAD
>>>>>>> 3809200 (fix: keep staged changes with the new changes in)
=======
            },
            {
                path: 'saved',
                element: <Saved />
            },
            {
                path: 'explore',
                element: <Explore />
            },
            {
                path: 'following-posts',
                element: <FollowingPost />
<<<<<<< HEAD
>>>>>>> de3925d (feat: add new routes for: saved, following, explore, etc.)
            }
=======
            },
            {
                path: 'comment/:id',
                element: <Comments/>
            },
>>>>>>> c2b8c38 (Creacion del componente Comments, donde se vera los comentarios de la publicaciones.)
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