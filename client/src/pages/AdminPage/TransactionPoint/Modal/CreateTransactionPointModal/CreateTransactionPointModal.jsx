import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { apiGetLeaders } from '../../../../../services/user';
import { apiCreateNewPoint } from '../../../../../services/transactionpoint';
function CreateTransactionPointModal(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState('');
  const [leaders, setLeaders] = useState([]);
  const [district, setDistrict] = useState('');
  const [reset, setReset] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    warehouseId: '',
    pointLeaderId: null,
  });

  const [formDataSubmit, setFormDataSubmit] = useState({
    name: '',
    address: '',
    warehouseId: '',
    pointLeaderId: '',
  });

  const { transactionPoints } = props;
  const {warehouses} = props;

  useEffect(() => {
    const fetchWarehouseLeader = async () => {
      try {
      const response = await apiGetLeaders('point')
      const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data)
        if (err === 0) {
          setLeaders(data)
        } else {
          console.log(msg)
        }

      } catch (error) {
        console.error('Error fetching leaders:', error);
      }
    };
    fetchWarehouseLeader();
  }, []);


  const handleHide = () => {
    setFormData({
        name: '',
        address: '',
        warehouseId: '',
        pointLeaderId: '',
    });
    if (props.onHide) {
      props.onHide();
    }
  };


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
        name: form.elements?.name.value,
        address: form.elements.address.value,
        warehouseId: form.elements.warehouseId.value,
        pointLeaderId: "",
      });
      console.log(formData)
      // const payload = {
      //   name: form.name,
      //   address: formData.address,
      //   warehouseId: formData.warehouse,
      //   pointLeaderId: formData.transactionPointLeader
      // }
      apiCreateNewPoint(formData)
      window.location.reload()
      // props.onHide();
      // setFormData({
      //   name: '',
      //   address: '',
      //   warehouse: '',
      //   transactionPointLeader: '',
      // });
    }
  };

  console.log(formDataSubmit)





  const setwarehouseId = (value) => {
    setFormData(prevData => ({
      ...prevData,
      warehouseId: value
    }));
  }

  const setpointLeaderId = (value) => {
    setFormData(prevData => ({
      ...prevData,
      pointLeaderId: value
    }));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Tạo điểm giao dịch mới</Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Tên điểm giao dịch</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên kho hàng"
                value={formData?.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên điểm giao dịch.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
            <Form.Group as={Col} controlId="address">
              <Form.Label>Địa chỉ điểm giao dịch</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên thành phố"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập địa chỉ.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="warehouseId">
              <Form.Label>Thuộc kho hàng</Form.Label>
              <Form.Control as="select" value={formData.warehouseId} onChange={(e) => setwarehouseId(e.target.value)}>
                <option>Chọn kho hàng</option>
                {warehouses.map((item) => (
                  <option key={item.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
            <Form.Group as={Col} controlId="notion">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập mô tả"
                // value={formData.address}
                // onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mô tả.
              </Form.Control.Feedback>
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

export default CreateTransactionPointModal;
