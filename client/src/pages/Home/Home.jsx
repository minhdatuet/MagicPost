import React, { useEffect } from 'react'
import './Home.css'
import { apiGetPackage, apiGetUser } from '../../services/user'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

export const Home = () => {
  const dispatch = useDispatch()
  const {isLogged} = useSelector(state => state.auth)
  const {userData} = useSelector(state => state.user)

  useEffect(() => {
      setTimeout(() => {
          isLogged && dispatch(actions.getUser())
      },500)
      
  },[isLogged])


  console.log(userData)

  return (
    <div id = "home">
      <input type = "text" id = "searchInformation-input" placeholder='Nhập mã đơn hàng...'></input>
      <button id = "btnSubmit">Xác nhận</button>
    </div>

  )
}
