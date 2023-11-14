import React, { useState } from 'react'
import './Login.css'
import Button from '../../conponents/Button/Button'
import { apiLogin } from '../../services/auth'

const Login = () => {
  const [payload, setPayload] = useState({
    phone: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async () => {
    try {
      if (!payload.phone || !payload.password) {
        setErrorMessage('Vui lòng điền đầy đủ thông tin đăng nhập!');
        return;
      }
      const response = await apiLogin(payload);
      console.log(response);
      
      if (response && response.error) {
        setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác!');
      } else {
        setErrorMessage('');
        //chuyển sang trang của người dùng
      }
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi khi đăng nhập!');
    }
  }

  return (
    <div id = "container">
      <div id = "container-signIn">
        <h1>Đăng nhập</h1>
        <br></br>
        <form>
            <input type="text" id='phone' value={payload.phone} placeholder=" Số điện thoại"
            onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}) )} />
            <br></br>
            <input id='password' type="password" placeholder=" Mật khẩu"
            value={payload.password} onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
        </form>
        {errorMessage && (
            <p style={{ color: 'red', marginTop: '5px'}}>{errorMessage}</p>
        )}
        <Button text="Xác nhận" textColor="navy" bgColor="white" width="100px" onClick={handleSubmit} />
      </div>
      <div id = "poster">
        <h1>Xin chào!</h1>
        <p>
          Vui lòng nhập thông tin cá nhân 
          <br></br>
          để sử dụng website
        </p>
      </div>
    </div>
  )
}

export default Login