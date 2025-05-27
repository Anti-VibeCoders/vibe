import App from './App'
import Login from '@/pages/Login'
import Error from '@/pages/Error'
import Register from '@/pages/Register'
import Restore from '@/pages/Restore'
import Messages from '@/pages/Messages'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/messages',
                element: <Messages />,
                children: [
                    {
                        path: '/messages/:id',
                        element: <Messages />
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />
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