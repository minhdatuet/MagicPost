import React, { useState } from 'react';
import { BrowserRouter as Router, Link, NavLink, Routes, Route } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './SidebarComponent.scss';

import { Home } from '../../pages/Home/Home';
import Warehouse from '../../pages/Warehouse';
import TransactionPoint from '../../pages/TransactionPoint';
import Package from '../../pages/Package';
import Account from '../../pages/Account';

function SidebarComponent() {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex', height: '200vh' }}>
      <Sidebar
        collapsed={collapsed}
        onCollapse={handleCollapse}
      >
        <Menu>
          <MenuItem
            icon={
              <MenuRoundedIcon
                onClick={handleCollapse}
              />
            }
            as={Link}
            to="/"
          >
            <h2>ROLE</h2>
          </MenuItem>
          <MenuItem icon={<WarehouseRoundedIcon />}
                    component={<Link to="warehouse" className="link" />}
          > Quản lý kho </MenuItem>
          <MenuItem icon={<FactoryRoundedIcon />}
          component={<Link to="transaction" className="link" />}
          > Quản lý điểm giao dịch </MenuItem>
          <MenuItem icon={<Inventory2RoundedIcon />}
          component={<Link to="package" className="link" />}
          > Quản lý đơn hàng </MenuItem>
          <MenuItem icon={<AccountCircleRoundedIcon />}
          component={<Link to="account" className="link" />}
          > Quản lý tài khoản </MenuItem>
          </Menu>
      </Sidebar>
      <section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="transaction" element={<TransactionPoint />} />
        <Route path="package" element={<Package />} />
        <Route path="account" element={<Account />} />
      </Routes>
    </section>
    </div>
  );
}

export default SidebarComponent;