import React from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div id='header'>
      <Link to='/'>
      <img className='item' src='https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/370155549_311193485111056_8657900676603146860_n.png?_nc_cat=103&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=qwwJR7LfOSkAX9Yzekj&_nc_oc=AQlpfXZNHzpSuhOZhc8a5ceLebEhC1EumH1R2hpF-Nn0aGC95hmC6rG32XbnndsMrkY&_nc_ht=scontent.fhan14-3.fna&oh=03_AdSGm4ctzDcaTUh561-3RLO5vlossoNlQYXO957jH-Ue-g&oe=657A583E' />
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