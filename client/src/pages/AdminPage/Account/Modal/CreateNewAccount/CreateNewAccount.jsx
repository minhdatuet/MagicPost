import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { getAllWarehouses, getAllTransactionPoints } from '../../../../../store/actions';
function CreateNewAccountModal(props) {
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const { warehouses } = useSelector((state) => state.warehouse);
  const { transactionPoints } = useSelector((state) => state.transactionPoint);
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);
  useEffect(() => {
    dispatch(getAllTransactionPoints());
  }, []);
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    role: "",
    workLocation: "",
  });

  const handleHide = () => {
    setFormData({
        userName: "",
        phone: "",
        role: "",
        workLocation: "",
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

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
        setFormData({
            name: "",
           phone: "",
           role: "",
           workLocation: "",
      })
      props.onHide();;
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
          Tạo tài khoản trưởng kho/trưởng điểm
        </Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="userName">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên tài khoản"
                value={formData.userName}
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
          <Row style={{ marginTop: "10px" }} className="mb-3">
            <Form.Group as={Col} md="6" controlId="role">
              <Form.Label>Chọn loại tài khoản</Form.Label>
              <Form.Control
                as="select"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Chọn loại tài khoản
                </option>
                <option value="POINT_LEADER">Trưởng điểm</option>
                <option value="WAREHOUSE_LEADER">Trưởng kho</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="workLocation">
  <Form.Label>Vị trí làm việc</Form.Label>
  <Form.Control
    as="select"
    value={formData.workLocation}
    onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
    required
  >
    <option value="" disabled>
      Chọn vị trí làm việc
    </option>
    {formData.role === "WAREHOUSE_LEADER" ? (
        warehouses.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))
      ) : (
        transactionPoints.map((transactionPoint) => (
          <option key={transactionPoint.id} value={transactionPoint.id}>
            {transactionPoint.name}
          </option>
        ))
      )}      
  </Form.Control>
  <Form.Control.Feedback type="invalid">
    Vui lòng chọn vị trí làm việc.
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
