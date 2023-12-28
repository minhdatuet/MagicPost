import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FormGroup,
} from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWarehouses,
  getAllTransactionPoints,
} from "../../../../../store/actions";

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
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    role: "",
    workLocation: "",
  });
  const { account } = props;
  console.log(account);
  useEffect(() => {
    // console.log('YES')
    setFormData({
      ...account,
    //   userName: account.name,
    // userPhone: account.phone,
    // role: account.accountType,
    // workLocation: account.Warehouses[0].name !== null ? account.Warehouses[0].name : account.TransactionPoints[0].name !== null ? account.TransactionPoints.name : "",
    userName: "",
    userPhone: "",
    role: "",
    workLocation: "",
    });
  }, [account]);
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
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
        userPhone: "",
        role: "",
        workLocation: "",
      });
    }
  };

  const handleHide = () => {
    setFormData({
      ...account,
      userName: "",
      userPhone: "",
      role: "",
      workLocation: "",
    });
    if (props.onHide) {
      props.onHide();
    }
  };

  const setAccountLeader = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      AccountLeader: value,
    }));
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="userName">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                // required
                type="text"
                defaultValue={formData?.name}
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="userPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                defaultValue={formData?.userPhone}
                value={formData.userPhone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }} className="mb-3">
            <Form.Group as={Col} md="6" controlId="role">
              <Form.Label>Chọn chức vụ</Form.Label>
              <Form.Control
                as="select"
                defaultValue={formData?.role}
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="POINT_LEADER">Trưởng điểm</option>
                <option value="WAREHOUSE_LEADER">Trưởng kho</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="workLocation">
              <Form.Label>Chọn chức vụ</Form.Label>
              <Form.Control
                as="select"
                defaultValue={formData?.workLocation}
                value={formData.workLocation}
                onChange={(e) =>
                  setFormData({ ...formData, workLocation: e.target.value })
                }
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
