import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Tab, ModalBody } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import avt from "../../../../assets/images/avt.jpg"


function ShowInfoTransactionPoint(props) {
  const [activeTab, setActiveTab] = useState('tab1');
  const { transactionPoint } = props;
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };
  console.log(transactionPoint)

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await apiGetPackagesOfWarehouse(warehouse.id);
//         const data = response?.data.response;
//         const err = response?.data.err;
//         const msg = response?.data.msg;
//         console.log(data)
//         if (err === 0) {
//           setPackages(data);
//         } else {
//           console.log(msg)
//         }

//       } catch (error) {
//         console.error('Error fetching packages:', error);
//       }
//     };
//     fetchPackages();
//   }, []);

//   useEffect(() => {
//     const fetchPoints = async () => {
//       try {
//         const response = await apiGetPointsOfWarehouse(warehouse.id);
//         const data = response?.data.response;
//         const err = response?.data.err;
//         const msg = response?.data.msg;
//         console.log(data)
//         if (err === 0) {
//           setWarehousePoint(data);
//         } else {
//           console.log(msg)
//         }

//       } catch (error) {
//         console.error('Error fetching packages:', error);
//       }
//     };
//     fetchPoints();
//   }, []);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static" size="lg">
      <Modal.Header>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
          <Tab eventKey="tab1" title="Trưởng điểm">
          </Tab>
          <Tab eventKey="tab2" title="Đơn hàng">
          </Tab>
          <Tab eventKey="tab3" title="Nhân viên">
          </Tab>
        </Tabs>
        <CloseIcon onClick={props.onHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        {activeTab === 'tab1' &&
          <div>
            {transactionPoint && transactionPoint.pointLeader && (
              <div style={{ display: 'flex', gap: '70px' }}>
                <div style={{ marginLeft: '10%', marginRight: '10%' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Mã nhân viên:</strong>
                    </label>
                    <p>
                      {transactionPoint.pointLeader.id}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Họ và tên:</strong>
                    </label>
                    <p>
                      {transactionPoint.pointLeader.name}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Số điện thoại:</strong>
                    </label>
                    <p>
                      {transactionPoint.pointLeader.phone}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Địa chỉ:</strong>
                    </label>
                    <p>
                      {transactionPoint.pointLeader.address}
                    </p>
                  </div>
                </div>
                <img src={avt} style={{ width: '150px', height: '150px' }}></img>
              </div>
            )}
          </div>
        }
        {activeTab === 'tab2' &&
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            {/* <ul>
              {warehousePoint.map(item => (
                <li key={item.id}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên điểm giao dịch:</strong>
                      </label>
                      <p>
                        {item.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên trưởng kho:</strong>
                      </label>
                      <p>
                        {item.pointLeader.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Số điện thoại trưởng kho:</strong>
                      </label>
                      <p>
                        {item.pointLeader.phone}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Địa chỉ: </strong>
                      </label>
                      <p>
                        {item.address}
                      </p>
                    </div>
                    <hr></hr>
                  </div>
                </li>
              ))}
            </ul> */}
          </div>
        }
        {activeTab === 'tab3' &&
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            {/* <ul>
              {packages.map((packageItem, index) => (
                <li key={index}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Mã đơn hàng: </strong>
                      </label>
                      <p>
                        {packageItem.packageCode}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên người gửi: </strong>
                      </label>
                      <p>
                        {packageItem.sender.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên người nhận: </strong>
                      </label>
                      <p>
                        {packageItem.receiver.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên đơn hàng: </strong>
                      </label>
                      <p>
                        {packageItem.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Phí vận chuyển:</strong>
                      </label>
                      <p>
                        {packageItem.shippingCost}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Trạng thái:</strong>
                      </label>
                      <p>
                        {packageItem.Status.nameOfStatus}
                      </p>
                    </div>
                    <hr></hr>
                  </div>
                </li>
              ))}
            </ul> */}
          </div>
        }
      </Modal.Body>
    </Modal>
  );
}

export default ShowInfoTransactionPoint;