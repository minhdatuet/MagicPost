import React from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div id='header'>
      <Link to='/'>
      <img className='item' src='https://o.remove.bg/downloads/6bb86de3-825e-4175-948a-30ba12c7f045/Screenshot_2023-11-08_142532-removebg-preview.png' />
      </Link>
      <span></span>
      <div className='item'>Giới thiệu</div>
      <div className='item'>Hướng dẫn</div>
      <div className='item'>
        <input type="text" id='search-input' placeholder='Searching...' />
        <BsSearch />
      </div>
      <Link to='/login'>
        <Button className='item' text="Đăng nhập" textColor="white" bgColor="black" width="100px" />
      </Link>
      <Link to='/register'>
        <Button className='item' text="Đăng ký" textColor="black" bgColor="white" width="100px" />
      </Link>
      
    </div>
    
  )
}

export default Header