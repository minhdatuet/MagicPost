import React, { useState } from 'react'
import './Login.css'
import Button from '../../conponents/Button/Button'
import { apiLogin } from '../../services/auth'

const Login = () => {
  const [payload, setPayload] = useState({
    phone: '',
    password: ''
  })
  const handleSubmit = async () => {
    // console.log(payload)
    const response = await apiLogin(payload)
    console.log(response)
  }

  return (
    <div id='login'>
        <h3>Đăng nhập</h3>
        <div>
            <label htmlFor="phone">Số điện thoại: </label>
            <input type="text" id='phone' value={payload.phone} onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}) )} />
            <br />
            <label htmlFor="password">Mật khẩu: </label>
            <input id='password' type="password" value={payload.password} onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
        </div>
        <Button className='item' text="Đăng nhập" textColor="white" bgColor="black" width="100px" onClick={handleSubmit} />
    </div>

  )
}

export default Login