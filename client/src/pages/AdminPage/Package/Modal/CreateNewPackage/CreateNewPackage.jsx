import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateNewPackage.scss'
function CreateNewPackageModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    senderName: '',
    senderPhone: '',
    senderPassword: '',
    receiverName: '',
    receiverPhone: '',
    receiverPassword: '',
    transactionPointStartId: localStorage.getItem('transactionPointId'),
    transactionPointEndId: '',
    warehouseStartId: localStorage.getItem('warehouseId'),
    warehouseEndId: '',
    name: '',
    shippingCost: ''
  });
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {  
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      console.log('Form submitted:', formData);
      props.onHide()
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static" size='lg'>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Tạo đơn hàng mới</Modal.Title>
        <CloseIcon onClick={props.onHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row style={{ marginTop: '10px' }} className="mb-3">
            <Form.Group as={Col} md="4" controlId="id">
              <Form.Label>ID người gửi</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập ID đơn hàng"
                value={formData.id}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập ID đơn hàng.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="senderId">
            <Form.Label>ID người gửi</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nhập ID người gửi"
              value={formData.senderId}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập ID người gửi.
            </Form.Control.Feedback>
          </Form.Group>
            <Form.Group as={Col} md="4" controlId="receiverId">
              <Form.Label>ID người nhận</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập ID người nhận"
                value={formData.receiverId}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập ID người nhận.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
          <Form.Group as={Col} md="3" controlId="transactionPointStartId">
          <Form.Label>ID điểm giao dịch đầu</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nhập ID"
            value={formData.transactionPointStartId}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Vui lòng nhập ID điểm giao dịch đầu.
          </Form.Control.Feedback>
          </Form.Group>
            <Form.Group as={Col} md="3" controlId="transactionPointEndId">
            <Form.Label>ID điểm giao dịch cuối</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nhập ID"
              value={formData.transactionPointEndId}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập ID điểm giao dịch cuối.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="warehouseStartId">
            <Form.Label>ID kho hàng đầu</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nhập ID"
              value={formData.warehouseStartId}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập ID kho hàng đầu
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="warehouseEndId">
            <Form.Label>ID kho hàng đầu</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nhập ID"
              value={formData.warehouseEndId}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập ID kho hàng cuối.
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
          <Form.Group as={Col} md="6" controlId="name">
          <Form.Label>Tên đơn hàng</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nhập tên đơn hàng"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Vui lòng nhập tên đơn hàng.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="shippingCost">
        <Form.Label>Giá vận chuyển</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Nhập giá vận chuyển"
          value={formData.shippingCost}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập giá vận chuyển.
        </Form.Control.Feedback>
      </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <div className="text-center mt-3" style={{ marginTop: '50px' }}>
              <Button variant="secondary" type="submit" id="input-submit">
                Tạo mới
              </Button>
              <Button variant="secondary" onClick={props.onHide}>
                Đóng
              </Button>
            </div>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewPackageModal;