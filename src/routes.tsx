import App from './App'
import Login from '@/pages/Login'
import Error from '@/pages/Error'
import Register from '@/pages/Register'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <Error />
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
    }
]

export default routes