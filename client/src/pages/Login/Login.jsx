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
    const response = await apiLogin(payload)
    console.log(response)
  }

  return (

    <div id='login'>
        <br></br>
        <h3>ĐĂNG NHẬP</h3>
        <div>
          <div class="input-icons">
            <i class="fa fa-phone icon"></i>
            <input type="text" id='phone' value={payload.phone} placeholder="Số điện thoại"
            onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}) )} />
            <br />
            <i class="fa fa-edit icon"></i>
            <input id='password' type="password" placeholder="Mật khẩu"
            value={payload.password} onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
          </div>
        </div>
        <br></br>
        <div id = "btn">
          <Button className='item' text="Đăng nhập" textColor="white" bgColor="black" width="100px" onClick={handleSubmit} />
        </div>
        <br></br>
    </div>

  )
}

export default Login