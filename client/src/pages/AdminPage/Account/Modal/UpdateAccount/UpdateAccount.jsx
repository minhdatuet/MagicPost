import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarehouses, getAllTransactionPoints } from "../../../../../store/actions";

function UpdateAccountModal(props) {
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

  const { account } = props;
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    role: "",
    workLocation: "",
  });

  useEffect(() => {
    setFormData({
      ...account,
      userName: account.name || "", // Set the initial value for userName to account.name or an empty string
      phone: account.phone || "", // Set the initial value for phone to account.phone or an empty string
      role: account.accountType || "", // Set the initial value for role to account.accountType or an empty string
      workLocation:
        account.Warehouses[0]?.name || account.TransactionPoints[0]?.name || "", // Set the initial value for workLocation based on your conditions
    });
  }, [account]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      props.onHide();
      setFormData({
        userName: "",
        phone: "",
        role: "",
        workLocation: "",
      });
    }
  };

  const handleHide = () => {
    setFormData({
      ...account,
      userName: "",
      phone: "",
      role: "",
      workLocation: "",
    });
    if (props.onHide) {
      props.onHide();
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
          Cập nhật tài khoản
        </Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="userName">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="phone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Form.Group as={Col} md="6" controlId="role">
              <Form.Label>Chọn chức vụ</Form.Label>
              <Form.Control
                as="select"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="POINT_LEADER">Trưởng điểm</option>
                <option value="WAREHOUSE_LEADER">Trưởng kho</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="workLocation">
              <Form.Label>Chọn chức vụ</Form.Label>
              <Form.Control
                as="select"
                value={formData.workLocation}
                onChange={handleInputChange}
              >
                <option value="">Chọn vị trí làm việc</option>
                {formData.role === "WAREHOUSE_LEADER"
                  ? warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))
                  : transactionPoints.map((transactionPoint) => (
                      <option
                        key={transactionPoint.id}
                        value={transactionPoint.id}
                      >
                        {transactionPoint.name}
                      </option>
                    ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn vị trí làm việc.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="text-center mt-3" style={{ marginTop: "50px" }}>
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

export default UpdateAccountModal;
