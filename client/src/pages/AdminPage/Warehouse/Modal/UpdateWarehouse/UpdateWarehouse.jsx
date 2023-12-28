import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';

function UpdateWarehouseModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [reset, setReset] = useState(false);

  const { warehouses } = props;
  const { warehouse } = props;

  const [selectedLeader, setSelectedLeader] = useState('');

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  useEffect(() => {
    setFormData({
      ...warehouse
    });

  }, [warehouse])

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    }
    if (form.checkValidity()) {
      // apiUpdateWarehouseById(formData);
      console.log(formData);
    }
    setValidated(true);
    if (validated) {
      // apiCreatePackage(formData)
    }
  };

  const handleHide = () => {
    setReset(false);
    setValidated(false);
    setFormData({
      ...warehouse
    });

    props.onHide();
  };

  useEffect(() => {
    setFormData({
      ...warehouse
    });

  }, [warehouse])

  const setWarehouseLeader = (value) => {
    const selectedName = warehouses.find((item) => {
      return item.warehouseLeader.id.toString() === value;
    })?.warehouseLeader.name || '';

    setFormData(prevData => ({
      ...prevData,
      warehouseLeader: selectedName,
      warehouseLeaderId: value
    }));
  }

  console.log(formData)

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
                  <option key={item.id} value={item.warehouseLeader.id}>
                    {item.warehouseLeader.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <div className="text-center mt-3" style={{ marginTop: '50px' }}>
              <Button variant="secondary" type="submit" id="input-submit" onClick={handleSubmit}>
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
