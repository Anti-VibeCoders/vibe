import App from './App'
<<<<<<< HEAD
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
=======
import Error from '@/common/pages/Error'
import Register from '@/pages/features/auth/pages/Register'
import Restore from '@/pages/features/auth/pages/Restore'
import Messages from '@/pages/features/chat/pages/Messages'
import Profile from '@/pages/features/profile/pages/Profile'
import SidenavLayout from '@/common/layout/SidenavLayout'
import Notifications from '@/pages/features/social/components/notifications/Notifications'
<<<<<<< HEAD
import NewPost from './pages/features/social/components/posts/NewPost'
import Config from './pages/features/auth/pages/Config'
import Following from './pages/features/social/pages/Following'
import Saved from './pages/features/profile/pages/Saved'
import Explore from './pages/features/social/pages/Explore'
import FollowingPost from './pages/FollowingPost'
import Comments from './common/shared/Comments'
>>>>>>> c185db4 (refactor: improve folder structure and organization)
=======
import NewPost from '@/pages/features/social/components/posts/NewPost'
import Config from '@/pages/features/auth/pages/Config'
import Following from '@/pages/features/social/pages/Following'
import Saved from '@/pages/features/profile/pages/Saved'
import Explore from '@/pages/features/social/pages/Explore'
import Comments from '@/pages/features/comments/pages/Comments'
<<<<<<< HEAD
>>>>>>> 6fadaf4 (feat: add params to routes like profile to get data from user)
=======
import ProtectedRoutes from './utils/ProtectedRoutes'
>>>>>>> 82299c4 (feat: create ProtectedRoutes and assign it in routes.tsx)

>>>>>>> be6c850 (Creacion de la pagina Following y estilo base de los contenedores de los usuarios)
const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: '/home',
        element: (
        <ProtectedRoutes>
            <SidenavLayout />
        </ProtectedRoutes>
        ),
        errorElement: <Error />,
        children: [    
            {
<<<<<<< HEAD
                path: 'messages',
                element: <Messages />,
                children: [
                    {
                        path: ':id',
                        element: <Chat />
                    }
                ]
=======
                path: 'messages/:id',
<<<<<<< HEAD
                element: <Messages />
>>>>>>> e955c26 (refactor: change messages route)
=======
                element: (
                    <ProtectedRoutes>
                        <Messages />
                    </ProtectedRoutes>
                )
>>>>>>> 82299c4 (feat: create ProtectedRoutes and assign it in routes.tsx)
            },
            {
                path: 'profile/:id',
                element: (
                    <ProtectedRoutes>
                        <Profile />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'notifications',
                element: (
                    <ProtectedRoutes>
                        <Notifications />
                    </ProtectedRoutes>
                )
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
<<<<<<< HEAD
                element: <Following/>
<<<<<<< HEAD
>>>>>>> 11e50e3 (cambio en la ruta ahora se accede a la pagina de siguiendo en perfil en el apartado de siguiendo y se le añadio un hover a ese mismo texto)
=======
=======
                element: (
                    <ProtectedRoutes>
                        <Following/>
                    </ProtectedRoutes>
                )
>>>>>>> 82299c4 (feat: create ProtectedRoutes and assign it in routes.tsx)
            },
            {
                path: 'new-post',
                element: (
                    <ProtectedRoutes>
                        <NewPost/>
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'configuration',
<<<<<<< HEAD
                element: <Config />
<<<<<<< HEAD
>>>>>>> 3809200 (fix: keep staged changes with the new changes in)
=======
=======
                element: (
                    <ProtectedRoutes>
                        <Config />
                    </ProtectedRoutes>
                )
>>>>>>> 82299c4 (feat: create ProtectedRoutes and assign it in routes.tsx)
            },
            {
                path: 'saved',
                element: (
                    <ProtectedRoutes>
                        <Saved />
                    </ProtectedRoutes>
                )
            },
            {
                path: 'explore',
                element: (
                    <ProtectedRoutes>
                        <Explore />
                    </ProtectedRoutes>
                )
            },
            {
<<<<<<< HEAD
                path: 'following-posts',
                element: <FollowingPost />
<<<<<<< HEAD
>>>>>>> de3925d (feat: add new routes for: saved, following, explore, etc.)
            }
=======
            },
            {
=======
>>>>>>> 6fadaf4 (feat: add params to routes like profile to get data from user)
                path: 'comment/:id',
                element: (
                    <ProtectedRoutes>
                        <Comments/>
                    </ProtectedRoutes>
                )
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