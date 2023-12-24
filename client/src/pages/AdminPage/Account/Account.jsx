import React, { useEffect, useState } from 'react';
import { apiGetAllPackages } from '../../../services/package';

const Account = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await apiGetAllPackages();
        const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        if (err === 0) {
          setPackages(data);
        } else {
          console.log(msg)
        }
        
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []); // Tham số thứ hai là một array rỗng để chỉ chạy một lần khi component mount

  const handleSubmit = async () => {
    // Trong hàm này, bạn có thể sử dụng state packages đã được cập nhật.
    console.log(packages);

    // Tiếp tục xử lý dữ liệu hoặc gọi các hàm khác tại đây...
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 'auto' }}>Account</h1>
      <button onClick={handleSubmit}>Click Me!</button>
    </div>
  );
};

export default Account;