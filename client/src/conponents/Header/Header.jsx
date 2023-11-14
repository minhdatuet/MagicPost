import React from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const Header = () => {
  return (
    <div id='header'>
      <Link to='/'>
      <img id = "logo" className='item' src= {logo} alt = ""/>
      </Link>
      <span></span>
      <Link to='/aboutUs'> 
        <Button className='item' text="Giới thiệu" textColor="Navy" bgColor="white" width="100px" />
      </Link>
      <Link to='/construction'>
      <Button className='item' text="Hướng dẫn" textColor="Navy" bgColor="white" width="100px" />
      </Link>
      <div className='item'>
        <input type="text" id='search-input' placeholder='Searching...' />
        <BsSearch />
      </div>
      <Link to='/login'>
        <Button className='item' text="Đăng nhập" textColor="white" bgColor="Navy" width="100px" />
      </Link>
      {/* <Link to='/register'>
        <Button className='item' text="Đăng ký" textColor="black" bgColor="white" width="100px" />
      </Link> */}
      
    </div>
    
  )
}

export default Header