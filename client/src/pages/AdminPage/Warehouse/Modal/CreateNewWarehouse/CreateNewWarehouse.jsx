import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../../../../../services/package';
import './CreateNewWarehouse.scss'
import { apiLeader } from '../../../../../services/auth';
import { apiGetLeaders } from '../../../../../services/user';
function CreateNewWarehouseModal(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [reset, setReset] = useState(false);
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

  // console.log(warehouses);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

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


  useEffect(() => {
    const fetchWarehouseLeader = async () => {
      const response = await apiGetLeaders('warehouse')
      if (response.status === 200) {
        console.log(response.data.response)
      } else {
        console.log(response.data.msg)
      }
    };
    fetchWarehouseLeader();
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
    event.preventDefault(); 
  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setFormData({
        name: form.elements.name.value,
        address: form.elements.address.value,
        warehouseLeader: form.elements.warehouseLeader.value,
      });
      setFormDataSubmit(formData)
      console.log(formDataSubmit)
      props.onHide(); 
      setFormData({
        name: '',
        address: '',
        warehouseLeader: '',
      });
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
        <Modal.Title id="contained-modal-title-vcenter">Tạo kho hàng mới</Modal.Title>
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
                value={formData.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên kho hàng.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
            <Form.Group as={Col} controlId="address">
              <Form.Label>Tỉnh/Thành phố</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên thành phố"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên thành phố.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="warehouseLeader">
              <Form.Label>Trưởng kho hàng</Form.Label>
              <Form.Control as="select" value={formData.warehouseLeader} onChange={(e) => setWarehouseLeader(e.target.value)}>
                <option>Chọn trưởng kho</option>
                {warehouses.map((item) => (
                  <option key={item.id} value={item.warehouseLeader.name}>
                    {item.warehouseLeader.name}
                  </option>
                ))}
                <option>lê Minh Đạt</option>
                <option>Ngô Thảo Hương</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <div className="text-center mt-3" style={{ marginTop: '50px' }}>
              <Button variant="secondary" id="input-submit" type = "submit">
                Tạo mới
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

export default CreateNewWarehouseModal;
