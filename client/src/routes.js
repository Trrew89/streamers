import AuthPage from "./pages/Auth/AuthPage"
import StreamersListPage from "./pages/StreamersListPage/StreamersListPage"
import StreamerPage from "./pages/StreamerPage"

export const authRoutes = [
    {
        path: '/',
        Component: StreamersListPage
    },
    {
        path: '//:id',
        Component: StreamerPage
    }
]

export const publicRoutes = [
    {
        path: '/login',
        Component: AuthPage
    },
    {
        path: '/registration',
        Component: AuthPage
    }
]