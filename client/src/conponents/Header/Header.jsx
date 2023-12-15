import React, { useEffect } from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'


const Header = () => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.auth)
  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    const handleScroll = () => {
      var header = document.getElementById('header');
      var nav = document.getElementById('nav');
      var a = document.querySelectorAll('#nav a');
      var input = document.querySelector('#nav input');
      if (header && nav) {
        if (window.scrollY > header.offsetHeight) {
          nav.style.backgroundColor = 'white'; 
          a.forEach(link => {
            link.style.color = 'black';
          });
          input.style.backgroundColor = '#ECECEC';
        } else {
          nav.style.backgroundColor = 'transparent'; 
          a.forEach(link => {
            link.style.color = 'white';
          });
          input.style.backgroundColor = '#D7D7D7';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id = 'header'>
      <nav id = "nav">
        <ul className = "menuNav">
          <li>
            <div className = "logo">
              <Link to = '/'>
                <h2>MAGIC POST</h2>
              </Link>
          </div>
          </li>
          <span className='header-span'></span>
          <li>
          <Link to='/aboutUs'> 
            Giới thiệu
          </Link>
          </li>
          <li>
            <Link to='/construction'>
              Hướng dẫn
            </Link>
          </li>
          <li>
            <div className = "search">
              <input type = "text" id = "search-input" placeholder='Nhập mã đơn hàng...'></input>
            </div>
          </li>
          {!isLogged && <li>
            <Link to = '/login'>
              Đăng nhập
            </Link>
          </li>}
          {isLogged && userData && <li onClick={() => dispatch(actions.logout())}>
          
          <Link to = '/login'>
              <div>Đăng xuất</div>
            </Link>
          </li>}
        </ul>
      </nav>
      <br></br>
      <div className = "post">
        <h1>Welcome to Magic Post</h1>
      </div>
    </div>
  )
}

export default Header