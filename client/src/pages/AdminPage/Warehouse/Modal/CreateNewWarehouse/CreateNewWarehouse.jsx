import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../../../../../services/package';
import './CreateNewWarehouse.scss'
function CreateNewWarehouseModal(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [reset, setReset] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    leaderId: '',
  });

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

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
        <Modal.Title id="contained-modal-title-vcenter">Tạo kho hàng mới</Modal.Title>
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
          <Form.Group as={Col} md='6'>
          <Form.Label>Tỉnh/Thành phố</Form.Label>
          <Form.Control as="select" value={province} onChange={(e) => setProvince(e.target.value)}>
            <option value="">Chọn tỉnh</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md='6'> 
          <Form.Label>Quận/Huyện</Form.Label>
          <Form.Control as="select" value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option value="">Chọn quận</option>
            {districts.map((district) => (
              <option key={district.district_id} value={district.district_id}>
                {district.district_name}
              </option>
            ))}
          </Form.Control>
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

export default CreateNewWarehouseModal;
