import React, { useEffect, useState } from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { getAllPackages } from "../../store/actions/package";
import tem from '../../assets/images/tem.png'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)
  const { packages } = useSelector((state) => state.package);
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [packageItem, setSearchedPackage] = useState(null);
  const [statusPackage, setStatusPackage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPackages());
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

  // console.log(packages)

  const onChangeHandler = (text) => {
    let matches = []
    var input = document.querySelector('#nav input');
    if (text.length > 0) {
      input.style.borderRadius = '15px 15px 0px 0px';
      matches = packages.filter(usr => {
        const regex = new RegExp(`${text}`, "gi");
        return usr.packageCode.match(regex)
      })
    } else {
      input.style.borderRadius = '15px';
    }
    if (matches.length == 0) {
      input.style.borderRadius = '15px';
    }
    console.log(matches);
    setSuggestions(matches);
    setText(text)
  }

  useEffect(() => {
    if (showModal && packageItem && statusPackage.length > 0) {
      console.log("Chuyển trang")
      navigate('/packageForm', {
        state: {
          packageItem: packageItem,
          statusPackage: statusPackage
        }
      })
    }
  }, [statusPackage, showModal, packageItem]);

  const openModal = (suggestions) => {

    setShowModal(true);
    console.log("hi");
    setSearchedPackage(suggestions)
    const statusTimes = [
      [suggestions.Status.datePointEndReceived,
      suggestions.transactionPointEnd && suggestions.transactionPointEnd.name ? suggestions.transactionPointEnd.name + " đang chuyển đơn hàng." : null],

      [suggestions.Status.dateReceiverReturn, 'Người nhận trả lại hàng lúc ' + suggestions.Status.dateReceiverReturn],

      [suggestions.Status.dateSendPackage, 'Người gửi gửi đơn hàng tại điểm giao dịch ' + suggestions.transactionPointStart.name + " lúc " + suggestions.Status.dateSendPackage],

      [suggestions.Status.dateSendToPointEnd,
      suggestions.transactionPointEnd && suggestions.transactionPointEnd.name ? 
      "Đơn hàng chuyển tới điểm giao dịch " + suggestions.transactionPointEnd.name + " lúc " +  suggestions.transactionPointEnd: null],

      [suggestions.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận lúc " + suggestions.Status.dateSendToReceiver],

      [suggestions.Status.dateSendToWarehouseEnd, suggestions.warehouseEnd && suggestions.warehouseEnd.name ? 
      "Đơn hàng rời khỏi kho " + suggestions.warehouseStart.name +  " lúc " + suggestions.Status.dateSendToWarehouseEnd : null],

      [suggestions.Status.dateSendToWarehouseStart, suggestions.warehouseStart && suggestions.warehouseStart.name ? 
      "Đơn hàng rời khỏi điểm giao dịch " + suggestions.transactionPointStart.name +  " lúc " + suggestions.Status.dateSendToWarehouseStart : null],

      [suggestions.Status.dateWarehouseEndReceived, suggestions.warehouseEnd && suggestions.warehouseEnd.name ? 
      "Đơn hàng nhập kho " + suggestions.warehouseEnd.name + " lúc " + suggestions.Status.dateWarehouseEndReceived: null],

      [suggestions.Status.dateWarehouseStartReceived, suggestions.warehouseStart && suggestions.warehouseStart.name ? 
      "Đơn hàng nhập kho " + suggestions.warehouseStart.name + " lúc " + suggestions.Status.dateWarehouseStartReceived : null],

      [suggestions.Status.receivedDate, "Đơn hàng được trả lại lúc " + suggestions.Status.receivedDate]
    ];
    const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);
    filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setStatusPackage(filteredStatusTimes);
    setText("");
    setSuggestions("");
    var input = document.querySelector('#nav input');
    input.style.borderRadius = '15px';
  };
  return (
    <div id='header'>
      <nav id="nav">
        <ul className="menuNav">
          <li>
            <div className="logo">
              <Link to='/'>
                <h2>MAGIC POST</h2>
              </Link>
            </div>
          </li>
          {/* <span className='header-span'></span> */}
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
            <div className="search">
              <input type="text"
                id="search-input"
                placeholder='Nhập mã đơn hàng...'
                value={text}
                onChange={e => onChangeHandler(e.target.value)}>
              </input>
            </div>
            {suggestions && suggestions.map((suggestions, i) =>
              <div key={i} className="searchBox"
              onClick={() => openModal(suggestions)}>
                {suggestions.packageCode}
              </div>
            )}
          </li>
          {!isLogged && <li>
            <Link to='/login'>
              Đăng nhập
            </Link>
          </li>}
          {isLogged && userData && <li onClick={() => dispatch(actions.logout())}>

            <Link to='/login'>
              <div>Đăng xuất</div>
            </Link>
          </li>} 
        </ul>
      </nav>
      <br></br>
      <div className="post">
        <h1>Welcome to Magic Post</h1>
      </div>
    </div>
  )
}

export default Header