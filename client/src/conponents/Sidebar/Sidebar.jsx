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
  AccountBalanceRounded,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import LogoutIcon from '../../assets/icons/logout.svg';
import * as actions from '../../store/actions';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClickLogout = () => {
    localStorage.setItem('role', '');
    localStorage.setItem('id', '');
    localStorage.setItem('name', '');
    dispatch(actions.logout())
    navigate('/');
    window.location.reload();
  };
  const handleItemClick = (key) => {
    // Store the active state in localStorage
    localStorage.setItem("activeKey", key);
    setIsActive(key);
  };

  const navList = [
    {
      role: "BOSS",
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
      ],
    },
    {
      role: "POINT_LEADER",
      navChild: [
        {
          icon: AccountBalanceRounded,
          title: "Giao dịch viên",
          link: "/pointLeader/account",
          key: 1,
        },
        {
          icon: Inventory2Rounded,
          title: "Hàng hoá",
          link: "/pointLeader/package",
          key: 2,
        },
      ],
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
      ],
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
      ],
    },
  ];
  const [isActive, setIsActive] = useState(() => {
    const storedActiveKey = parseInt(localStorage.getItem('activeKey'));
    const isValidKey = navList.find((item) =>
      item.navChild.some((child) => child.key === storedActiveKey)
    );
    return isValidKey ? storedActiveKey : (navList[0]?.navChild[0]?.key || 1);
  });

  return (
    <nav className="sidebar">
      <div className="sidebarWrapper">
        {navList.map((item) =>
          localStorage.getItem('role') === item.role ? (
            <div className="sidebarMenu">
              <Link style={{ textDecoration: "none" }} to={'${item.role}'}>
                <h3 className="sidebarTitle">{item.role}</h3>
              </Link>
              <ul className="sidebarList">
                {item.navChild.map((child) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={() => handleItemClick(child.key)}
                    to={child.link}
                    className="link"
                  >
                    <li
                      className={
                        isActive === child.key
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <child.icon className="sidebarIcon" />
                      <h3 className="sidebarText">{child.title}</h3>
                      {/* {child.title} */}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : null
        )}
        <div className="sidebar-footer" onClick={handleClickLogout}>
          <span className="sidebar-item-label">Đăng xuất</span>
          <img
            src={LogoutIcon}
            alt="icon-logout"
            className="sidebar-item-icon"
          />
        </div>
      </div>
    </nav>
  );
}
