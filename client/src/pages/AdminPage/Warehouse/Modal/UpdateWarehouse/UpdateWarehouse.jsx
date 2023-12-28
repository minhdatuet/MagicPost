import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';

function UpdateWarehouseModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    warehouseLeader: '',
  });
  const [formDataSubmit, setFormDataSubmit] = useState({
    name: '',
    address: '',
    warehouseLeader: '',
  });

  const { warehouses } = props;
  const {warehouse} = props;

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setFormDataSubmit({
        name: form.elements.name.value,
        address: form.elements.address.value,
        warehouseLeader: form.elements.warehouseLeader.value,
      });
      props.onHide(); 
      setFormData({
        name: '',
        address: '',
        warehouseLeader: '',
      });
    }
  };

  console.log(formDataSubmit)
  
  const handleHide = () => {
    setFormData({
      name: '',
      address: '',
      warehouseLeader: '',
    });
    if (props.onHide) {
      props.onHide();
    }
  };

  const setWarehouseLeader = (value) => {
    setFormData(prevData => ({
      ...prevData,
      warehouseLeader: value
    }));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Cập nhật kho hàng</Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Tên kho hàng</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên kho hàng"
                value={formData?.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên kho hàng.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
            <Form.Group as={Col} md="7" controlId="address">
              <Form.Label>Tỉnh/Thành phố</Form.Label>
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
                  Vui lòng nhập địa chỉ.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="warehouseLeader">
              <Form.Label>Trưởng kho hàng</Form.Label>
              <Form.Control as="select" value={formData.warehouseLeader} onChange={(e) => setWarehouseLeader(e.target.value)}>
                <option>Chọn trưởng kho</option>
                {warehouses.map((item) => (
                  <option key={item.id} value={item.warehouseLeader?.name}>
                    {item.warehouseLeader?.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <div className="text-center mt-3" style={{ marginTop: '50px' }}>
              <Button variant="secondary" type="submit" id="input-submit">
                Cập nhật
              </Button>
              <Button variant="secondary" onClick={handleHide}>
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
