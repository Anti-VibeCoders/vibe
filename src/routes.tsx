import App from './App'
import Error from '@/pages/Error'
import Register from '@/pages/Register'
import Restore from '@/pages/Restore'
import Messages from '@/pages/Messages'
import Profile from '@/pages/Profile'
import SidenavLayout from '@/layout/SidenavLayout'
import Notifications from '@/pages/Notifications'
import NewPost from './pages/NewPost'
import Friends from './pages/Friends'
import Chat from '@/pages/Chat';
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
                path: "newpost",
                element: <NewPost/>
            },
            {
                path: "friends",
                element: <Friends/>
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