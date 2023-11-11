import React, { useState } from 'react'
import './Register.css'
import Button from '../../conponents/Button/Button'
import * as actions from '../../store/actions'
import { useDispatch } from 'react-redux'

const Register = () => {
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    password: '',
    address: ''
  })
  const handleSubmit = async () => {
    console.log(payload)
    dispatch(actions.register(payload))
  }

  return (
    <div id='register'>
        <h3>Đăng ký</h3>
        <div>
            <label htmlFor="name">Họ và tên: </label>
            <input type="text" id='name' value={payload.name} onChange={(e) => setPayload(prev => ({...prev, name: e.target.value}) )} />
            <br />
            <label htmlFor="phone">Số điện thoại: </label>
            <input type="text" id='phone' value={payload.phone} onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}) )} />
            <br />
            <label htmlFor="password">Mật khẩu: </label>
            <input id='password' type="password" value={payload.password} onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
            <br />
            <label htmlFor="address">Địa chỉ: </label>
            <input type="text" id='address' value={payload.address} onChange={(e) => setPayload(prev => ({...prev, address: e.target.value}) )} />
            <br />
        </div>
        <Button className='item' text="Đăng ký" textColor="white" bgColor="black" width="100px" onClick={handleSubmit} />
    </div>

  )
}

export default Register