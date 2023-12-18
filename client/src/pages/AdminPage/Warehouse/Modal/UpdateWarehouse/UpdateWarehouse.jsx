import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';

function UpdateWarehouseModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    leaderId: '',
  });

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
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
      props.onHide();
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Cập nhật kho hàng</Modal.Title>
        <CloseIcon onClick={props.onHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="id">
              <Form.Label>ID kho hàng</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập ID kho hàng"
                value={formData.id}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên kho hàng.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Tên kho hàng</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên kho hàng"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập ID kho hàng.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{marginTop: '10px'}} className="mb-3">
          <Form.Group as={Col} md="7" controlId="address">
            <Form.Label>Địa chỉ</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ cụ thể"
                aria-describedby="inputGroupPrepend"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập ID trưởng kho hàng.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="leaderId">
              <Form.Label>ID trưởng kho hàng</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID trưởng kho"
                required
                value={formData.leaderId}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập ID trưởng kho.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <div className="text-center mt-3" style={{marginTop: '50px'}}>
            <Button variant="secondary" type="submit" id="input-submit">
              Cập nhật
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

export default UpdateWarehouseModal;
