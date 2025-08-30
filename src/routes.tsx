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