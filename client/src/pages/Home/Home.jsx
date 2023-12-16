<<<<<<< HEAD
import { useState } from 'react';
import React from 'react';
import './Home.css';
import { apiSearch } from '../../services/auth';
import tem from '../../assets/images/tem.png'

export const Home = () => {
  const [packageID, setPackageID] = useState('');
  const [packageInfo, setPackageInfo] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await apiSearch(packageID)
      setPackageInfo(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
=======
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

>>>>>>> 815b9de5f71fd6105034b76d9c829ec06cbb8ed0
  return (
    <div id = "home">
      <div className = "flexSearch">
        <input type = "text" 
        id = "searchInformation-input" 
        placeholder='Nhập mã đơn hàng...'
        value={packageID}
        onChange={(e) => setPackageID(e.target.value)}>
        </input>
        <button id = "btnSubmit" onClick={handleSearch}>
          Xác nhận
        </button>
      </div>

      <div className='packageForm'>
        <div className = "flex1"></div>
        <div className = "flex2">
          <h1>BIỂU MẪU ĐƠN HÀNG</h1>
          <p>Magic Post</p>
        </div>
        <div className="flex3">
          <div className='info'>
            <div className='flex3-1'>
              <div className = "flex1">
                <p>THÔNG TIN NGƯỜI DÙNG</p>
              </div>
              <div className = "flex4">
                <div className = "flex5">
                  <p className='pLabel'>Họ và tên: </p>
                  <p>Ngô Yến Vi</p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Số điện thoại: </p>
                  <p>0347418330</p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Địa chỉ: </p>
                  <p>Hồ Tùng Mậu, Cầu Diễn, Hà Nội</p>
                </div>
                <img id ="tem" src = {tem} alt = ""></img>
              </div>
            </div>
            <div className='flex3-2'>
              <div className = "flex1">
                <p>THÔNG TIN ĐƠN HÀNG</p>
              </div>
              <div className = "flex4">
                <div className = "flex5">
                  <p className='pLabel'>Mã đơn hàng: </p>
                  <p>123456789</p>
                  <p></p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Mã người gửi: </p>
                  <p>123xxxxxx</p>
                  <p></p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Mã người nhận: </p>
                  <p>321xxxxxx</p>
                  <p></p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Tên sản phẩm: </p>
                  <p>Manga</p>
                  <p></p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Giá vận chuyển: </p>
                  <p>25.000 (VNĐ)</p>
                  <p></p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Điểm gửi hàng: </p>
                  <p>Transaction Point Start</p>
                  <p></p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Điểm nhận hàng: </p>
                  <p>Transaction Point End</p>
                  <p></p>
                </div>
                <div className = "flex5">
                  <p className='pLabel'>Trạng thái: </p>
                  <p className='pStatus'>Đang xử lý</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <p>
            <i>
              <strong>Lưu ý:</strong> Có vấn đề về thông tin khách hàng hay đơn hàng thì vui lòng liên hệ cho số điện thoại (+84)123456789</i>
          </p>
          <p>
            <i>
              <strong>Thời gian hỗ trợ:</strong> Thứ 2 đến thứ 6 (8h30-17h00) hàng tuần</i>
          </p>
        </div>
      </div>

      {/* {packageInfo && (
        <div className="packageForm">

        </div>
      )} */}
    </div>

  )
}
