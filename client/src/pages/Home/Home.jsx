import React from 'react';
import './Home.css'

export const Home = () => {
  return (
    <div id = "home">
      <input type = "text" id = "searchInformation-input" placeholder='Nhập mã đơn hàng...'></input>
      <button id = "btnSubmit">Xác nhận</button>
    </div>

  )
}
