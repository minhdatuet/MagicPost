import Account from "../pages/AdminPage/Account/Account";
import { Home } from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Package from "../pages/AdminPage/Package/Package";
import Register from "../pages/Register/Register";
import TransactionPoint from "../pages/AdminPage/TransactionPoint/TransactionPoint";
import Warehouse from "../pages/AdminPage/Warehouse/Warehouse";
import Construction from "../pages/Construction/Construction"
import AboutUs from "../pages//AboutUs//AboutUs"
import DashBoardAdmin from "../pages/AdminPage/Dashboard/DashBoardAdmin"

const publicRoutes = [
    {
      path: '/login',
      page: Login
    },
    {
      path: '/register',
      page: Register
    },
    {
      path: '/construction',
      page: Construction
    },
    {
      path: '/aboutUs',
      page: AboutUs
    },
    {
      path: '/',
      page: Home
    },
    {
      path: '*',
      page: Home
    }
  ];
  
const bossRoutes = [
    {
        path: 'boss/dashboard',
        page: DashBoardAdmin
    },
    {
        path: 'boss/warehouse',
        page: Warehouse
    },
    {
        path: 'boss/transaction',
        page: TransactionPoint
    },
    {
        path: 'boss/package',
        page: Package
    },
    {
        path: 'boss/account',
        page: Account
    },
]

export {publicRoutes, bossRoutes}