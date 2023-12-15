import React, { useState } from 'react'
import './Login.css'
import Button from '../../conponents/Button/Button'
import { apiLogin } from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import car from '../../assets/images/car.png'

const Login = () => {
  const [payload, setPayload] = useState({
    phone: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
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
        // Clear sensitive information from the state
        // setPayload({ phone: '', password: '' });
        console.log(response);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('role', response.data.accountType);
        // window.location.reload();
      }
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi khi đăng nhập!');
    }
  }

  return (
    <div id = "container">
      <div id = "container-signIn">
        <div id = "flex1">
          <div className = "flexRow">
            <img id = "imgSignIn" src= {car} alt = ""/>
            <h1>Đăng nhập</h1>
          </div>
          <form>
            <div id = "phone">
              <label>Số điện thoại</label>
              <input type="text" id='phone' value={payload.phone} placeholder="Số điện thoại"
              onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}) )} />
            </div>
            <div id = "password">
              <label>Mật khẩu</label>
              <input id='password' type="password" placeholder="Mật khẩu"
              value={payload.password} onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
            </div>
          </form>
          <br></br>
          <button className = "btnSignIn" onClick={handleSubmit}>Xác nhận</button>
          <br></br>
          {errorMessage && (
              <p style={{ color: 'red', marginTop: '5px'}}>{errorMessage}</p>
          )}
        </div>
      </div>
      <div id = "poster">
        <div id = "flex2">
          <h1>Xin chào!</h1>
          <p>
            Vui lòng nhập thông tin cá nhân 
            <br></br>
            để sử dụng website
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login