import React, { useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './SidebarComponent.scss';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../../pages/Home/Home';
import Account from '../../pages/Account';
import Package from '../../pages/Package';
import TransactionPoint from '../../pages/TransactionPoint';
import Warehouse from '../../pages/Warehouse';

function SidebarComponent() {
  // const { currentUser } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const navList = [
    {
      role: 'Admin',
      navChild: [
        {
          icon: WarehouseRoundedIcon,
          title: 'Warehouse',
          link: '/warehouse',
          key: 1,
        },
        {
          icon: FactoryRoundedIcon,
          title: 'Transaction',
          link: '/transaction',
          key: 2,
        },
        {
          icon: Inventory2RoundedIcon,
          title: 'Package',
          link: '/package',
          key: 3,
        },
        {
          icon: AccountCircleRoundedIcon,
          title: 'Account',
          link: '/account',
          key: 4,
        },
      ],
    },
  ];

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderNavItems = (navList) => {
    const userRole = 'Admin';
    const roleNavList = navList.find((item) => item.role === userRole);

    // if (!roleNavList || !roleNavList.navChild) {
    //   return null;
    // }

    return roleNavList.navChild.map((navItem) => {
      const Icon = navItem.icon;

      return (
        <Menu key={navItem.key}>
          <MenuItem
            icon={<Icon /> }
            component={<Link to={navItem.link} className="link" />}
          >
          {navItem.title}
          </MenuItem>
        </Menu>
      );
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar collapsed={collapsed} onToggle={handleCollapse}>
        <Menu>
          <MenuItem
            icon={<MenuRoundedIcon onClick={handleCollapse} />}
            component={<Link to= '/' className="link" />}
          >
            <h2>{'Admin'}</h2>
          </MenuItem>
          {renderNavItems(navList)}
        </Menu>
      </Sidebar>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/transaction" element={<TransactionPoint />} />
          <Route path="/package" element={<Package />} />
          <Route path="/account" element={<Account />} />
        </Routes>
  </section> 
    </div>
  );
}

export default SidebarComponent;
