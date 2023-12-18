import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap'; // Import necessary Bootstrap components
import axios from 'axios';

const ProvinceModal = ({ showModal, handleClose }) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    // Fetch provinces from your API or data source
    // Replace the URL with your actual API endpoint
    axios.get('https://your-api-endpoint/provinces')
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    // Fetch districts based on the selected province if needed
    // You'll need to replace the URL with your actual API endpoint
    axios.get(`https://your-api-endpoint/districts?provinceId=${event.target.value}`)
      .then(response => {
        // Set the districts in the state
        // setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    // Fetch wards based on the selected district if needed
    // You'll need to replace the URL with your actual API endpoint
    axios.get(`https://your-api-endpoint/wards?districtId=${event.target.value}`)
      .then(response => {
        // Set the wards in the state
        // setWards(response.data);
      })
      .catch(error => {
        console.error('Error fetching wards:', error);
      });
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chọn danh sách tỉnh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="province">
            <Form.Label>Tỉnh/Thành phố</Form.Label>
            <Form.Control as="select" value={selectedProvince} onChange={handleProvinceChange}>
              <option value="">Chọn tỉnh</option>
              {provinces.map(province => (
                <option key={province.id} value={province.id}>{province.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="district">
            <Form.Label>Quận/Huyện</Form.Label>
            <Form.Control as="select" value={selectedDistrict} onChange={handleDistrictChange}>
              <option value="">Chọn quận</option>
              {/* Render districts based on the selected province */}
              {/* {districts.map(district => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))} */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="ward">
            <Form.Label>Phường/Xã</Form.Label>
            <Form.Control as="select" value={selectedWard} onChange={handleWardChange}>
              <option value="">Chọn phường</option>
              {/* Render wards based on the selected district */}
              {/* {wards.map(ward => (
                <option key={ward.id} value={ward.id}>{ward.name}</option>
              ))} */}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProvinceModal;
