import { useState, useEffect } from 'react';
import React from 'react';
import './Home.css';
import { apiGetPackage, apiGetUser } from '../../../services/user'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPackages } from "../../../store/actions/package";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const [packageID, setPackageID] = useState('');
  const [statusPackage, setStatusPackage] = useState('');
  const { packages } = useSelector((state) => state.package);
  const [showPackageInfo, setShowPackageInfo] = useState(false);
  const [packageItem, setSearchedPackage] = useState(null);
  const navigate = useNavigate();
    useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  useEffect(() => {
    if (showPackageInfo && packageItem) {
      console.log("Chuyển trang")
      navigate(
        '/packageForm',
        {
          state: {
            packageItem: packageItem,
            statusPackage: statusPackage
          }
        }
      )
    }
  }, [statusPackage, showPackageInfo, packageItem]);

  console.log(packages);

  const handleSearch = async () => {
    const foundPackage = packages.find(packageItem => packageItem.packageCode === packageID);
    if (foundPackage) {
      const statusTimes = [
        [foundPackage.Status.datePointEndReceived,
        foundPackage.transactionPointEnd && foundPackage.transactionPointEnd.name ? foundPackage.transactionPointEnd.name + " đang chuyển đơn hàng." : null],

        [foundPackage.Status.dateReceiverReturn, 'Người nhận trả lại hàng lúc ' + foundPackage.Status.dateReceiverReturn],

        [foundPackage.Status.dateSendPackage, 'Người gửi gửi đơn hàng tại điểm giao dịch ' + foundPackage.transactionPointStart.name + " lúc " + foundPackage.Status.dateSendPackage],

        [foundPackage.Status.dateSendToPointEnd,
        foundPackage.transactionPointEnd && foundPackage.transactionPointEnd.name ? 
        "Đơn hàng chuyển tới điểm giao dịch " + foundPackage.transactionPointEnd.name + " lúc " +  foundPackage.transactionPointEnd: null],

        [foundPackage.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận lúc " + foundPackage.Status.dateSendToReceiver],

        [foundPackage.Status.dateSendToWarehouseEnd, foundPackage.warehouseEnd && foundPackage.warehouseEnd.name ? 
        "Đơn hàng rời khỏi kho " + foundPackage.warehouseStart.name +  " lúc " + foundPackage.Status.dateSendToWarehouseEnd : null],

        [foundPackage.Status.dateSendToWarehouseStart, foundPackage.warehouseStart && foundPackage.warehouseStart.name ? 
        "Đơn hàng rời khỏi điểm giao dịch " + foundPackage.transactionPointStart.name +  " lúc " + foundPackage.Status.dateSendToWarehouseStart : null],

        [foundPackage.Status.dateWarehouseEndReceived, foundPackage.warehouseEnd && foundPackage.warehouseEnd.name ? 
        "Đơn hàng nhập kho " + foundPackage.warehouseEnd.name + " lúc " + foundPackage.Status.dateWarehouseEndReceived: null],

        [foundPackage.Status.dateWarehouseStartReceived, foundPackage.warehouseStart && foundPackage.warehouseStart.name ? 
        "Đơn hàng nhập kho " + foundPackage.warehouseStart.name + " lúc " + foundPackage.Status.dateWarehouseStartReceived : null],

        [foundPackage.Status.receivedDate, "Đơn hàng được trả lại lúc " + foundPackage.Status.receivedDate]
      ];
      const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);

      filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
      setStatusPackage(filteredStatusTimes);
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
    </div>
  )
}
