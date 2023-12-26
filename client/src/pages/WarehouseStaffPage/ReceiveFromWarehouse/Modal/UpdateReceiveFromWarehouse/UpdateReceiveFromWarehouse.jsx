import React from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';

const UpdateReceiveFromWarehouse = ({ showModal, handleClose, selectedPackage }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const warehouseId = parseInt(localStorage.getItem('warehouseId'), 10);
    const warehouseName = localStorage.getItem('warehouseName');
    selectedPackage.warehouseEnd = {
      id: warehouseId,
      name: warehouseName,
    };
    console.log(localStorage);
    console.log(selectedPackage);
    handleClose();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nhận đơn hàng từ kho</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Xác nhận đơn hàng nhập kho hàng {localStorage.getItem('warehouseId')}:</p>
        <p>ID: {selectedPackage?.id}</p>
        <p>Ngưởi gửi: {selectedPackage?.sender.name}</p>
        <p>Người nhận: {selectedPackage?.receiver.name}</p>
        <p>Kho chuyển tới: {selectedPackage?.warehouseStart.name}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateReceiveFromWarehouse;
