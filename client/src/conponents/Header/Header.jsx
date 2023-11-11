import React from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div id='header'>
      <Link to='/'>
      <img id = "logo" className='item' src='https://scontent.fhan19-1.fna.fbcdn.net/v/t1.15752-9/371454029_994716528262043_8074586396406583516_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=gc_orEs1pQ0AX98ENbK&_nc_ht=scontent.fhan19-1.fna&oh=03_AdTEPywyx9FYDGD900HZcbq0E9n6IFA87aarVgA9DU1LdA&oe=657442B9' />
      </Link>
      <span></span>
      <Link to='/aboutUs'> 
        <Button className='item' text="Giới thiệu" textColor="black" bgColor="white" width="100px" />
      </Link>
      <Link to='/construction'>
      <Button className='item' text="Hướng dẫn" textColor="black" bgColor="white" width="100px" />
      </Link>
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