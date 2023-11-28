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
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LogoutIcon from '../../assets/icons/logout.svg';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();
  const handleClickLogout = () => {
    localStorage.setItem('role', '');
    localStorage.setItem('id', '');
    localStorage.setItem('name', '');
    navigate('/');
    window.location.reload();
};

  const navList = [
    {
      role: "Boss",
      navChild: [
        {
          icon: WarehouseRounded,
          title: "Kho hàng",
          link: "boss/warehouse",
          key: 1,
        },
        {
          icon: FactoryRounded,
          title: "Điểm giao dịch",
          link: "boss/transaction",
          key: 2,
        },
        {
          icon: Inventory2Rounded,
          title: "Đơn hàng",
          link: "boss/package",
          key: 3,
        },
        {
          icon: AccountBalanceRounded,
          title: "Tài khoản",
          link: "boss/account",
          key: 4,
        },
       ]
    },
    {
      role: "Leader",
      navChild: [
        {
          icon: AccountBalanceRounded,
          title: "Giao dịch viên",
          link: "/leader/account",
          key: 1,
        },
        {
          icon: Inventory2Rounded,
          title: "Hàng hoá",
          link: "/leader/package",
          key: 2,
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
          "Boss" === item.role ? <div className="sidebarMenu">
            <Link style={{ textDecoration: 'none' }} to={'/boss/dashboard'}>
                  <h3 className="sidebarTitle">{item.role}</h3>
            </Link>
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
        <div className='sidebar-footer' onClick={handleClickLogout}>
                        <span className="sidebar-item-label">Đăng xuất</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className="sidebar-item-icon" />
                    </div>
      </div>
    </nav>
    
  );
}