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

  const openModal = (suggestions) => {
    console.log("hi");
    setSearchedPackage(suggestions)
    const statusTimes = [
      [suggestions.Status.datePointEndReceived,
      suggestions.transactionPointEnd && suggestions.transactionPointEnd.name ? suggestions.transactionPointEnd.name + " đang chuyển đơn hàng." : null],
      [suggestions.Status.dateReceiverReturn, 'Người nhận trả lại hàng'],
      [suggestions.Status.dateSendPackage, 'Người gửi gửi đơn hàng'],
      [suggestions.Status.dateSendToPointEnd,
      suggestions.transactionPointEnd && suggestions.transactionPointEnd.name ? "Đơn hàng đang chuyển tới " + suggestions.transactionPointEnd.name : null],
      [suggestions.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận"],
      [suggestions.Status.dateSendToWarehouseEnd, suggestions.warehouseEnd && suggestions.warehouseEnd.name ? "Đơn hàng đang chuyển tới " + suggestions.warehouseEnd.name : null],
      [suggestions.Status.dateSendToWarehouseStart, suggestions.warehouseStart && suggestions.warehouseStart.name ? "Đơn hàng đang chuyển tới " + suggestions.warehouseStart.name : null],
      [suggestions.Status.dateWarehouseEndReceived, suggestions.warehouseEnd && suggestions.warehouseEnd.name ? suggestions.warehouseEnd.name + " đang chuyển đơn hàng" : null],
      [suggestions.Status.dateWarehouseStartReceived, suggestions.warehouseStart && suggestions.warehouseStart.name ? suggestions.warehouseStart.name + " đang chuyển đơn hàng" : null],
      [suggestions.Status.receivedDate, "Ngày trả lại hàng"]
    ];
    const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);

    const currentDateTime = new Date();
    let closestTime = null;
    let closestDiff = Infinity;

    for (const statusTime of filteredStatusTimes) {
      const time = statusTime[0];
      const diff = Math.abs(currentDateTime - new Date(time)); 
      if (diff < closestDiff) {
        closestTime = statusTime;
        closestDiff = diff;
      }
    }
    setStatusPackage(closestTime);
    setShowModal(true);
    setText("");
    setSuggestions("");
    var input = document.querySelector('#nav input');
    input.style.borderRadius = '15px';
  };

  const closeModal = () => {
    setShowModal(false);
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
      {showModal && packageItem && (
        <div className="boxPackage">
          <div className="flex2">
            <h1>BIỂU MẪU ĐƠN HÀNG</h1>
            <p>Magic Post</p>
          </div>
          <button className = "close"
          onClick={() => closeModal()}>
            <i class="fa fa-times icon"></i>
          </button>
          <div className="flex3">
            <div className='info'>
              <div className='flex3-1'>
                <div className="flex1">
                  <p>THÔNG TIN NGƯỜI DÙNG</p>
                </div>
                <div className="flex4">
                  <div className="flex5">
                    <p className='pLabel'><strong>(*) Người gửi</strong></p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Họ và tên: </p>
                    <p>{packageItem.sender.name}</p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Số điện thoại: </p>
                    <p>{packageItem.sender.phone}</p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Địa chỉ: </p>
                    <p>{packageItem.sender.address}</p>
                  </div>
                </div>
                <hr></hr>
                <div className="flex4">
                  <div className="flex5">
                    <p className='pLabel'><strong>(*) Người nhận</strong></p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Họ và tên: </p>
                    <p>{packageItem.receiver.name}</p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Số điện thoại: </p>
                    <p>{packageItem.receiver.phone}</p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Địa chỉ: </p>
                    <p>{packageItem.receiver.address}</p>
                  </div>
                </div>
              </div>
              <div className='flex3-2'>
                <div className="flex1">
                  <p>THÔNG TIN ĐƠN HÀNG</p>
                </div>
                <div className="flex4">
                  <div className="flex5">
                    <p className='pLabel'>Mã đơn hàng: </p>
                    <p>{packageItem.packageCode}</p>
                    <p></p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Tên sản phẩm: </p>
                    <p>{packageItem.name}</p>
                    <p></p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Giá vận chuyển: </p>
                    <p>{packageItem.shippingCost}</p>
                    <p></p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Điểm gửi hàng: </p>
                    <p>{packageItem.transactionPointStart.name}</p>
                    <p></p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Điểm nhận hàng: </p>
                    <p>{packageItem.transactionPointEnd ? packageItem.transactionPointEnd.name : null}</p>
                    <p></p>
                  </div>
                  <div className="flex5">
                    <p className='pLabel'>Thông tin vận chuyển: </p>
                    <p className='pStatus'>{statusPackage[1]} lúc {statusPackage[0]}</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header