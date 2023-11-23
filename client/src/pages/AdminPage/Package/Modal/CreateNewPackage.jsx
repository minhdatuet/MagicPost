import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import './CreateNewPackage.css'
import CloseIcon from '@mui/icons-material/Close';
import 'bootstrap/dist/css/bootstrap.min.css';
function CreateNewPackageModal(props) {
    const [formData, setFormData] = useState({
        id: '',
        shippingCost: '',
        sender: '',
        receiver: '',
        // message: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        // Close the modal after submission
        props.onHide();
    };

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
            <Modal.Header>
                <CloseIcon onClick={props.onHide} style={{marginLeft: '96.5%'}}></CloseIcon>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="form-create" onSubmit={handleSubmit}>
                    <div className="half left cf">
                        <Form.Group controlId="input-id" style={{marginTop:'20px'}}>
                        <Form.Label>ID đơn hàng</Form.Label>
                            <Form.Control
                                type=""
                                placeholder="ID"
                                value={formData.id}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="input-shippingCost" style={{marginTop:'20px'}}>
                        <Form.Label>Phí vận chuyển(dự tính)</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email address"
                                value={formData.shippingCost}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        </div>
                        <div className="half center cf">
                        <Form.Group controlId="input-sender" style={{marginTop:'20px'}}>
                        <Form.Label>Người gửi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Sender"
                                value={formData.sender}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="input-receiver" style={{marginTop:'20px'}}>
                        <Form.Label>Số điện thoại người gửi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Receiver"
                                value={formData.receiver}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </div >
                    <div className="half right cf">
                        <Form.Group controlId="input-receiver" style={{marginTop:'20px'}}>
                            <Form.Label>Người nhận</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Sender"
                                value={formData.sender}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="input-receiver-sdt" style={{marginTop:'20px'}}>
                        <Form.Label>Số điện thoại người nhận</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Receiver"
                                value={formData.receiver}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                        </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                    <div className='btn' style={{alignContent: 'center'}}>
                    <Button variant="primary" type="submit" id="input-submit">
                        Submit
                    </Button>
                <Button onClick={props.onHide}>Close</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateNewPackageModal;
