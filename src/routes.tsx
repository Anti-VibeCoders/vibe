import App from './App'
import Error from '@/pages/Error'
import Register from '@/pages/Register'
import Restore from '@/pages/Restore'
import Messages from '@/pages/Messages'
import Profile from '@/pages/Profile'
import SidenavLayout from '@/layout/SidenavLayout'
import Notifications from '@/pages/Notifications'
import NewPost from './pages/NewPost'
import Config from './pages/Config'
import Following from './pages/Following'
import Saved from './pages/Saved'
import Explore from './pages/Explore'
import FollowingPost from './pages/FollowingPost'

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
                        path: 'messages/:id',
                        element: <Messages />
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
                path: 'following/:id',
                element: <Following/>
            },
            {
                path: 'new-post',
                element: <NewPost/>,
            },
            {
                path: 'configuration',
                element: <Config />
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