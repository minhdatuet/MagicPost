import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateWarehouse.scss'
function UpdateWarehouseModal(props) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    adrress: '',
    leaderId: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    props.onHide();
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Cập nhật kho hàng</Modal.Title>
        <CloseIcon onClick={props.onHide}></CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form className="form-update" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="input-id" style={{ marginTop: '20px' }}>
                <Form.Label>ID kho hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập ID kho hàng"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="input-address" style={{ marginTop: '20px' }}>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ cụ thể"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>              
            </div>
            <div className="col-md-6">
              {/* Right Column */}
              <Form.Group controlId="input-name" style={{ marginTop: '20px' }}>
                <Form.Label>Tên kho hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên kho hàng"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="input-idLeader" style={{ marginTop: '20px' }}>
                <Form.Label>ID trưởng kho hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập ID trưởng kho hàng"
                  value={formData.leaderId}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className='btn' style={{ alignContent: 'center' }}>
          <Button variant="secondary" type="submit" id="input-submit">
            Cập nhật
          </Button>
          <Button variant="secondary" onClick={props.onHide}>Đóng</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateWarehouseModal;
