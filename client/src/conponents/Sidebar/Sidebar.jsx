import "./Sidebar.css";
import {
  SendToMobile,
  Home,
  PermIdentity,
  Storefront,
  WorkOutline,
  Laptop,
  Warehouse,
  Settings,
  BarChart,
  MenuRounded,
  WarehouseRounded,
  FactoryRounded,
  Inventory2Rounded,
  AccountBalanceRounded
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LogoutIcon from '../../assets/icons/logout.svg';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(1);

  const navList = [
    {
      role: "Admin",
      navChild: [
        {
          icon: WarehouseRounded,
          title: "Kho hàng",
          link: "/warehouse",
          key: 1,
        },
        {
          icon: FactoryRounded,
          title: "Điểm giao dịch",
          link: "/transaction",
          key: 2,
        },
        {
          icon: Inventory2Rounded,
          title: "Đơn hàng",
          link: "/package",
          key: 3,
        },
        {
          icon: AccountBalanceRounded,
          title: "Tài khoản",
          link: "/account",
          key: 4,
        },
       ]
    },
    {
      role: "Factory",
      navChild: [
        {
          icon: BarChart,
          title: "Home",
          link: "/",
          key: 1,
        },
        {
          icon: Warehouse,
          title: "Warehouse",
          link: "/factory/warehouse",
          key: 2,
        },
        {
          icon: SendToMobile,
          title: "Export",
          link: "/factory/export",
          key: 3,
        },
        {
          icon: Settings,
          title: "Error Product",
          link: "/factory/error",
          key: 4,
        },
      ]
    },
    {
      role: "Store",
      navChild: [
        {
          icon: Home,
          title: "Home",
          link: "/",
          key: 1,
        },
        {
          icon: Storefront,
          title: "Store",
          link: "/store/products",
          key: 2,
        },
        {
          icon: Settings,
          title: "Import",
          link: "/store/import",
          key: 3,
        },
        // {
        //   icon: WorkOutline,
        //   title: "Warranty",
        //   link: "/store/warranty",
        //   key: 4,
        // },
      ]
    },
    {
      role: "ServiceCenter",
      navChild: [
        {
          icon: Home,
          title: "Home",
          link: "/",
          key: 1,
        },
        {
          icon: Settings,
          title: "Request",
          link: "/servicecenter/request",
          key: 3,
        },
      ]
    },
  ]

  return (
    <nav className="sidebar">
      <div className="sidebarWrapper">
        {navList.map((item) => (
          "Admin" === item.role ? <div className="sidebarMenu">
            <h3 className="sidebarTitle">{"Admin"}</h3>
            <ul className="sidebarList">
              {
                item.navChild.map((child) => (
                  <Link style={{ textDecoration: 'none' }} onClick={() => { setIsActive(child.key) }} to={child.link} className="link">
                    <li className={isActive === child.key ? "sidebarListItem active" : "sidebarListItem"}>
                      <child.icon className="sidebarIcon" />
                      <h3 className="sidebarText">{child.title}</h3>
                      {/* {child.title} */}
                    </li>
                  </Link>
                ))
              }
            </ul>
          </div> : null
        ))}
        <div className='sidebar-footer'>
                        <span className="sidebar-item-label">Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className="sidebar-item-icon" />
                    </div>
      </div>
    </nav>
    
  );
}