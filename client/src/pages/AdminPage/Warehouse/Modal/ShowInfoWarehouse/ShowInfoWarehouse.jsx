import React, { useState, useEffect } from 'react';
import "./ShowInfoWarehouse.css"
import { Modal, Tabs, Tab, ModalBody } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import avt from "../../../../../assets/images/avt.jpg"


function ShowInfoWarehouse(props) {
  const [activeTab, setActiveTab] = useState('tab1');
  const { warehouse } = props;
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const warehousePoint = [
    { id: 1, pointLeaderId: 101, name: 'Warehouse A', address: '123 Street, City A' },
    { id: 2, pointLeaderId: 102, name: 'Warehouse B', address: '456 Road, City B' },
    { id: 3, pointLeaderId: 103, name: 'Warehouse C', address: '789 Avenue, City C' }
  ];

  const packages = [
    {
      packageCode: 'ABC123',
      senderId: 'S001',
      receiverId: 'R001',
      transactionPointStartId: 'TP001',
      warehouseStartId: 'W001',
      transactionPointEndId: 'TP002',
      warehouseEndId: 'W002',
      name: 'Package 1',
      shippingCost: 50,
      status: 'In Transit'
    },
    {
      packageCode: 'DEF456',
      senderId: 'S002',
      receiverId: 'R002',
      transactionPointStartId: 'TP003',
      warehouseStartId: 'W003',
      transactionPointEndId: 'TP004',
      warehouseEndId: 'W004',
      name: 'Package 2',
      shippingCost: 75,
      status: 'Delivered'
    },
    {
      packageCode: 'GHI789',
      senderId: 'S003',
      receiverId: 'R003',
      transactionPointStartId: 'TP005',
      warehouseStartId: 'W005',
      transactionPointEndId: 'TP006',
      warehouseEndId: 'W006',
      name: 'Package 3',
      shippingCost: 100,
      status: 'Pending'
    }
  ];

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static" size="x0.1">
      <Modal.Header>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
          <Tab eventKey="tab1" title="Trưởng kho">
          </Tab>
          <Tab eventKey="tab2" title="Điểm giao dịch">
          </Tab>
          <Tab eventKey="tab3" title="Đơn hàng">
          </Tab>
        </Tabs>
        <CloseIcon onClick={props.onHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        {activeTab === 'tab1' &&
          <div>
            {warehouse && warehouse.warehouseLeader && (
              <div style={{ display: 'flex', gap: '70px' }}>
                <div style={{ marginLeft: '10%' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Mã nhân viên:</strong>
                    </label>
                    <p>
                      {warehouse.warehouseLeader.id}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Họ và tên:</strong>
                    </label>
                    <p>
                      {warehouse.warehouseLeader.name}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Số điện thoại:</strong>
                    </label>
                    <p>
                      {warehouse.warehouseLeader.phone}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Địa chỉ:</strong>
                    </label>
                    <p>
                      {warehouse.warehouseLeader.address}
                    </p>
                  </div>
                </div>
                <img src = {avt} style={{ width: '150px', height: '150px' }}></img>
              </div>

            )}
          </div>
        }
        {activeTab === 'tab2' &&
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <ul>
              {warehousePoint.map(item => (
                <li key={item.id}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Mã điểm giao dịch:</strong>
                      </label>
                      <p>
                        {item.id}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Mã trưởng kho:</strong>
                      </label>
                      <p>
                        {item.pointLeaderId}
                      </p>
                    </div>
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
            </ul>
          </div>
        }
        {activeTab === 'tab3' &&
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <ul>
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
                        <strong>Mã người gửi: </strong>
                      </label>
                      <p>
                        {packageItem.senderId}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Mã người nhận: </strong>
                      </label>
                      <p>
                        {packageItem.receiverId}
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
                    <hr></hr>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }
      </Modal.Body>
    </Modal>
  );
}

export default ShowInfoWarehouse;