import React, { useEffect, useState, useRef } from 'react'
import './Login.css'
import Button from '../../conponents/Button/Button'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom'
import car from '../../assets/images/car.png'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {isLogged} = useSelector(state => state.auth)
  const {userData} = useSelector(state => state.user)
  const [payload, setPayload] = useState({
    phone: '',
    password: ''
  })

  useEffect(() => {
    isLogged && navigate('/')
  }, [isLogged])
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  }
  
  const handleSubmit = async () => {
    try {
      if (!payload.phone || !payload.password) {
        setErrorMessage('Vui lòng điền đầy đủ thông tin đăng nhập!');
        return;
      }
      
      const response = dispatch(actions.login(payload))
      console.log(response);

      
      
      if (response && response.error) {
        setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác!');
      } else {
        // Clear sensitive information from the state
        // setPayload({ phone: '', password: '' });
        // console.log(response);
        // localStorage.setItem('id', response.data.id);
        // localStorage.setItem('name', response.data.name);
        localStorage.setItem('role', 'BOSS');
        navigate(`/boss/dashboard`);
        window.location.reload();
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
            <div id = "phoneDiv">
              <label className='label-login'>Số điện thoại</label>
              <input type="text" id='phone' 
              value={payload.phone} 
              placeholder="Số điện thoại"
              onKeyDown={handleKeyDown}
              onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}) )} />
            </div>
            <div id = "passwordDiv">
              <label>Mật khẩu</label>
              <input id='password' 
              type="password" 
              placeholder="Mật khẩu"
              value={payload.password} 
              ref={passwordRef}
              onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
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