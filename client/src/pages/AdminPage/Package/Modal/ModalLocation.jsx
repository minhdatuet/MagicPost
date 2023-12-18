import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import necessary Bootstrap components
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../../../../services/package';

function ProvinceModal(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [reset, setReset] = useState(false);

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

 {/* useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${district ? `${districts?.find((item) => item.district_id === district)?.district_name},` : ''} ${
        province ? provinces?.find((item) => item.province_id === province)?.province_name : ''
      }`,
      province: province ? provinces?.find((item) => item.province_id === province)?.province_name : '',
    }));
  }, [province, district]); */}

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Địa chỉ cho thuê</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
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

          <Form.Group>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProvinceModal;
