import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';

function UpdateTransactionPoint(props) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        warehouse: '',
        transactionPointLeader: '',
    });

    const [formDataSubmit, setFormDataSubmit] = useState({
        name: '',
        address: '',
        warehouse: '',
        transactionPointLeader: '',
    });

    const { transactionPoints } = props;
    const { warehouses } = props;
    const {transactionPoint} = props


    const handleHide = () => {
        setFormData({
            name: '',
            address: '',
            warehouse: '',
            transactionPointLeader: '',
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
                name: form.elements.name.value,
                address: form.elements.address.value,
                warehouse: form.elements.warehouse.value,
                transactionPointLeader: form.elements.transactionPointLeader.value,
            });
            props.onHide();
            setFormData({
                name: '',
                address: '',
                warehouse: '',
                transactionPointLeader: '',
            });
        }
    };

    console.log(formDataSubmit)





    const setWarehouse = (value) => {
        setFormData(prevData => ({
            ...prevData,
            warehouse: value
        }));
    }

    const setTransactionPointLeader = (value) => {
        setFormData(prevData => ({
            ...prevData,
            transactionPointLeader: value
        }));
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Cập nhập điểm giao dịch</Modal.Title>
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
                                value={formData.name}
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
                        <Form.Group as={Col} md="5" controlId="warehouse">
                            <Form.Label>Thuộc kho hàng</Form.Label>
                            <Form.Control as="select" value={formData.warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                                <option>Chọn kho hàng</option>
                                {warehouses.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} md="5" controlId="transactionPointLeader">
                        <Form.Label>Trưởng điểm</Form.Label>
                        <Form.Control as="select" value={formData.transactionPointLeader} onChange={(e) => setTransactionPointLeader(e.target.value)}>
                            <option>Chọn trưởng điểm</option>
                            {transactionPoints.map((item) => (
                                <option key={item.id} value={item.pointLeader.name}>
                                    {item.pointLeader.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Row style={{ marginTop: '10px' }}>
                        <div className="text-center mt-3" style={{ marginTop: '50px' }}>
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

export default UpdateTransactionPoint;