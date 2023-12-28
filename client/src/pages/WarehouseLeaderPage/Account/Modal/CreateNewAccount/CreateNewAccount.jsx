import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWarehouses,
  getAllTransactionPoints,
} from "../../../../../store/actions";
import { apiLeader, apiRegister } from "../../../../../services/auth";
function CreateNewAccountModal(props) {
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [noLeaderWarehouses, setNoLeaderWarehouses] = useState([])
  const [noLeaderPoints, setNoLeaderPoints] = useState([])
  const { warehouses } = useSelector((state) => state.warehouse);
  const { transactionPoints } = useSelector((state) => state.transactionPoint);
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);
  useEffect(() => {
    dispatch(getAllTransactionPoints());
  }, []);
  useEffect(() => {
    const filteredWarehouses = warehouses.filter(warehouse => warehouse.warehouseLeader === null);
    console.log(filteredWarehouses)
    setNoLeaderWarehouses(filteredWarehouses)
  }, [warehouses])

  useEffect(() => {
    const filteredPoints = transactionPoints.filter(warehouse => warehouse.pointLeader === null);
    console.log(filteredPoints)
    setNoLeaderPoints(filteredPoints)
  }, [transactionPoints])
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    password: "",
    accountType: "",
    positionId: localStorage.getItem('warehouseId'),
  });

  const handleHide = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      password: "",
      accountType: "",
      positionId: localStorage.getItem('warehouseId'),
    });
    if (props.onHide) {
      props.onHide();
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setFormData({
        name: "",
        phone: "",
        address: "",
        password: "",
        accountType: "",
        positionId: localStorage.getItem('warehouseId'),
      });
      console.log(formData)
      const fetchCreateUser = async () => {
        const response = await apiRegister(formData);
        if (formData.positionId && !response.data.err) {
          apiLeader(formData)
        }
      };
      
      fetchCreateUser()
      
      window.location.reload()
      // props.onHide();
    }
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="custom-modal"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Tạo tài khoản nhân viên kho
        </Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="name">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên tài khoản"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên tài khoản.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="phone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số điện thoại.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập địa chỉ.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="text-center mt-3" style={{ marginTop: "50px" }}>
              <Button variant="secondary" id="input-submit" type="submit">
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

export default CreateNewAccountModal;
