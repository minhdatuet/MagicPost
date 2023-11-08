import { Home } from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const routes = [
    {
        path: '/',
        page: Home
    },
    {
        path: '/login',
        page: Login
    },
    {
        path: '/register',
        page: Register
    },
    {
        path: '*',
        page: Home
    }
]