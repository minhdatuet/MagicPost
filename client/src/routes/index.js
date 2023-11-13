import { Home } from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Construction from "../pages/Construction/Construction"
import AboutUs from "../pages//AboutUs//AboutUs"

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
    },
    {
        path: '/construction',
        page: Construction
    },
    {
        path: '/aboutUs',
        page: AboutUs
    }
]