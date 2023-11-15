import Account from "../pages/Account";
import { Home } from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Package from "../pages/Package";
import Register from "../pages/Register/Register";
import TransactionPoint from "../pages/TransactionPoint";
import Warehouse from "../pages/Warehouse";

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
        path: '/warehouse',
        page: Warehouse
    },
    {
        path: "/transaction",
        page: TransactionPoint
    },
    {
        path: "/package",
        page: Package
    },
    {
        path: "account",
        page: Account
    }
]