import App from './App'
import Error from '@/common/pages/Error'
import Register from '@/pages/features/auth/pages/Register'
import Restore from '@/pages/features/auth/pages/Restore'
import Messages from '@/pages/features/chat/pages/Messages'
import Profile from '@/pages/features/profile/pages/Profile'
import SidenavLayout from '@/common/layout/SidenavLayout'
import Notifications from '@/pages/features/social/components/notifications/Notifications'
import NewPost from '@/pages/features/social/components/posts/NewPost'
import Config from '@/pages/features/auth/pages/Config'
import Following from '@/pages/features/social/pages/Following'
import Saved from '@/pages/features/profile/pages/Saved'
import Explore from '@/pages/features/social/pages/Explore'
import Comments from '@/pages/features/comments/pages/Comments'

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
                path: 'profile/:id',
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
                path: 'comment/:id',
                element: <Comments/>
            },
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