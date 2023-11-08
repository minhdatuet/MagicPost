import React from 'react'
import './Login.css'
import Button from '../../conponents/Button/Button'
const Login = () => {
  return (
    <div id='login'>
        <h3>Đăng nhập</h3>
        <div>
            <label htmlFor="phone">Số điện thoại</label>
            <input type="text" id='phone'/>
            <br />
            <label htmlFor="password">Mật khẩu</label>
            <input id='password' type="password" />
        </div>
        <Button className='item' text="Đăng nhập" textColor="white" bgColor="black" width="100px" />
    </div>

  )
}

export default Login