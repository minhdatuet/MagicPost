import { useState, useEffect } from 'react';
import React from 'react';
import './Home.css';
import { apiGetPackage, apiGetUser } from '../../services/user'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPackages } from "../../store/actions/package";
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

      filteredStatusTimes.sort((a, b) => new Date(b[0]) - new Date(a[0]));
      // const currentDateTime = new Date();
      // let closestTime = null;
      // let closestDiff = Infinity;

      // for (const statusTime of filteredStatusTimes) {
      //   const time = statusTime[0];
      //   const diff = Math.abs(currentDateTime - new Date(time)); 
      //   if (diff < closestDiff) {
      //     closestTime = statusTime;
      //     closestDiff = diff;
      //   }
      // }
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
