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
import ProtectedRoutes from './utils/ProtectedRoutes'

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
                path: 'messages/:id',
                element: (
                    <ProtectedRoutes>
                        <Messages />
                    </ProtectedRoutes>
                )
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
                path: 'following/:id',
                element: (
                    <ProtectedRoutes>
                        <Following/>
                    </ProtectedRoutes>
                )
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
                element: (
                    <ProtectedRoutes>
                        <Config />
                    </ProtectedRoutes>
                )
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
                path: 'comment/:id',
                element: (
                    <ProtectedRoutes>
                        <Comments/>
                    </ProtectedRoutes>
                )
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