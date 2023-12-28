import React from 'react';
import './HeaderRoleNoButton.css';
import { useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';

function HeaderRoleNoButton() {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.setItem('role', '');
    localStorage.setItem('id', '');
    localStorage.setItem('name', '');
    localStorage.setItem('transactionPointId', '');
    localStorage.setItem('warehouseId', '');
    dispatch(actions.logout());
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='dashboard-header-container1' style={{marginLeft: "85%"}}>
      <Tippy
        interactive
        visible={visible}
        onClickOutside={hide}
        placement='bottom'
        render={(attrs) => (
          <div
            className='user__profile'
            style={{
              marginLeft: '2em',
              backgroundImage:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6))',
              color: 'white',
              border: 'black',
              borderRadius: '10px',
              zIndex: '999',
            }}
            tabIndex='-1'
            {...attrs}
          >
            <Box
              sx={{
                padding: '12px 20px',
                borderBottom: '1px solid #ccc',
                minWidth: '200px',
              }}
            >
              <Typography
                sx={{ fontSize: '0.875rem', textAlign: 'center', fontWeight: 'bolder' }}
                variant='h6'
              >
                {localStorage.getItem('name')}
              </Typography>
              <Typography
                sx={{ fontSize: '0.875rem', textAlign: 'center', fontWeight: 'bolder' }}
                variant='h6'
              >
                {localStorage.getItem('role')}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: '5px 20px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <Button variant='text' style={{ color: 'white' }} fullWidth onClick={handleClickLogout}>
                Đăng xuất
              </Button>
            </Box>
          </div>
        )}
      >
        <Avatar
          className='user__avatar'
          onClick={visible ? hide : show}
          src='https://reqres.in/img/faces/7-image.jpg'
        />
      </Tippy>
    </div>
  );
}

export default HeaderRoleNoButton;
