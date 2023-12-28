import Account from "../pages/AdminPage/Account/Account";
import {Home} from "../pages/PublicPage/Home/Home";
import Login from "../pages/PublicPage/Login/Login";
import Package from "../pages/AdminPage/Package/Package";
import Register from "../pages/PublicPage/Register/Register";
import TransactionPoint from "../pages/AdminPage/TransactionPoint/TransactionPoint";
import Warehouse from "../pages/AdminPage/Warehouse/Warehouse";
import Construction from "../pages/PublicPage/Construction/Construction"
import AboutUs from "../pages/PublicPage/AboutUs//AboutUs"
import DashBoardAdmin from "../pages/AdminPage/Dashboard/DashBoardAdmin"
import PointLeaderPackage from "../pages/PointLeaderPage/Package/PointLeaderPackage";
import PointLeaderAccount from "../pages/PointLeaderPage/Account/PointLeaderAccount";
import pointStaffSendToWarehouse from "../pages/PointStaffPage/SendToWarehouse/SendToWarehouse";
import pointStaffReceiveFromWarehouse from "../pages/PointStaffPage/ReceiveFromWarehouse/ReceiveFromWarehouse";
import pointStaffSendToAccount from "../pages/PointStaffPage/SendToAccount/SendToAccount";
import Refund from "../pages/PointStaffPage/RefundPackage/Refund";
import WarehouseLeaderAccount from "../pages/WarehouseLeaderPage/Account/WarehouseLeaderAccount";
import WarehouseLeaderPackage from "../pages/WarehouseLeaderPage/Package/WarehouseLeaderPackage";
import warehouseStaffSendToWarehouse from "../pages/WarehouseStaffPage/SendToWarehouse/SendToWarehouse";
import warehouseStaffReceiveFromWarehouse from "../pages/WarehouseStaffPage/ReceiveFromWarehouse/ReceiveFromWarehouse";
import warehouseStaffSendToTransaction from "../pages/WarehouseStaffPage/SendToTransaction/SendToTransaction";
import warehouseStaffReceiveFromTransaction from "../pages/WarehouseStaffPage/ReceiveFromTransaction/ReceiveFromTransaction";
const publicRoutes = [
    {
      path: 'login',
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
const pointLeaderRoutes = [
  {
    path: 'pointLeader/account',
    page: PointLeaderAccount
  },
  {
    path: 'pointLeader/package',
    page: PointLeaderPackage
  }
]
const pointStaffRoutes = [
  {
    path: 'pointStaff/sendToWarehouse',
    page: pointStaffSendToWarehouse
  },
  {
    path: 'pointStaff/receiveFromWarehouse',
    page: pointStaffReceiveFromWarehouse
  },
  {
    path: 'pointStaff/sendToAccount',
    page: pointStaffSendToAccount
  },
  {
    path: 'pointStaff/refund',
    page: Refund
  }
]
const warehouseLeaderRoutes = [
  {
    path: 'warehouseLeader/account',
    page: WarehouseLeaderAccount
  },
  {
    path: 'warehouseLeader/package',
    page: WarehouseLeaderPackage
  }
]
const warehouseStaffRoutes = [
  {
    path: 'warehouseStaff/sendToWarehouse',
    page: warehouseStaffSendToWarehouse
  },
  {
    path: 'warehouseStaff/receiveFromWarehouse',
    page: warehouseStaffReceiveFromWarehouse
  },
  {
    path: 'warehouseStaff/sendToTransaction',
    page: warehouseStaffSendToTransaction
  },
  {
    path: 'warehouseStaff/receiveFromTransaction',
    page: warehouseStaffReceiveFromTransaction
  }
]

export {publicRoutes, bossRoutes, pointLeaderRoutes, pointStaffRoutes, warehouseLeaderRoutes, warehouseStaffRoutes}