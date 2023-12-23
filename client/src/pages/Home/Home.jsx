import { useState, useEffect } from 'react';
import React from 'react';
import './Home.css';
import { apiGetPackage, apiGetUser } from '../../services/user'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPackages } from "../../store/actions/package";
import tem from '../../assets/images/tem.png'


export const Home = () => {
  const dispatch = useDispatch();
  const [packageID, setPackageID] = useState('');
  const [statusPackage, setStatusPackage] = useState('');
  const { packages } = useSelector((state) => state.package);
  const [showPackageInfo, setShowPackageInfo] = useState(false);
  const [packageItem, setSearchedPackage] = useState(null);


  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  // console.log(packages);

  const handleSearch = async () => {
    const foundPackage = packages.find(packageItem => packageItem.packageCode === packageID);
    if(foundPackage) {
      const statusTimes = [
        [foundPackage.Status.datePointEndReceived,
        foundPackage.transactionPointEnd && foundPackage.transactionPointEnd.name ? foundPackage.transactionPointEnd.name + " đang chuyển đơn hàng." : null],
        [foundPackage.Status.dateReceiverReturn, 'Người nhận trả lại hàng'],
        [foundPackage.Status.dateSendPackage, 'Người gửi gửi đơn hàng'],
        [foundPackage.Status.dateSendToPointEnd,
        foundPackage.transactionPointEnd && foundPackage.transactionPointEnd.name ? "Đơn hàng đang chuyển tới " + foundPackage.transactionPointEnd.name : null],
        [foundPackage.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận"],
        [foundPackage.Status.dateSendToWarehouseEnd, foundPackage.warehouseEnd && foundPackage.warehouseEnd.name ? "Đơn hàng đang chuyển tới " + foundPackage.warehouseEnd.name : null],
        [foundPackage.Status.dateSendToWarehouseStart, foundPackage.warehouseStart && foundPackage.warehouseStart.name ? "Đơn hàng đang chuyển tới " + foundPackage.warehouseStart.name : null],
        [foundPackage.Status.dateWarehouseEndReceived, foundPackage.warehouseEnd && foundPackage.warehouseEnd.name ? foundPackage.warehouseEnd.name + " đang chuyển đơn hàng" : null],
        [foundPackage.Status.dateWarehouseStartReceived, foundPackage.warehouseStart && foundPackage.warehouseStart.name ? foundPackage.warehouseStart.name + " đang chuyển đơn hàng" : null],
        [foundPackage.Status.receivedDate, "Ngày trả lại hàng"]
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
    }
    setSearchedPackage(foundPackage);
    setShowPackageInfo(!!foundPackage);
  };

  return (
    <div id="home">
      <div className="flexSearch">
        <input type="text"
          id="searchInformation-input"
          placeholder='Nhập mã đơn hàng...'
          value={packageID}
          onChange={(e) => setPackageID(e.target.value)}>
        </input>
        <button id="btnSubmit" onClick={handleSearch}>
          Xác nhận
        </button>
      </div>
      {showPackageInfo && packageItem && (
        <div className='packageForm'>
          <div className="flex1"></div>
          <div className="flex2">
            <h1>BIỂU MẪU ĐƠN HÀNG</h1>
            <p>Magic Post</p>
          </div>
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
            <hr></hr>
            <p>
              <i>
                <strong>Lưu ý:</strong> Có vấn đề về thông tin khách hàng hay đơn hàng thì vui lòng liên hệ cho số điện thoại (+84)123456789</i>
            </p>
            <p>
              <i>
                <strong>Thời gian hỗ trợ:</strong> Thứ 2 đến thứ 6 (8h30-17h00) hàng tuần</i>
            </p>
            <img id="tem" src={tem} alt=""></img>
          </div>
        </div>
      )}
    </div>
  )
}
