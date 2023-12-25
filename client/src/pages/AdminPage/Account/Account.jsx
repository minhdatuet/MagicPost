import React, { useEffect, useState } from 'react';
import { apiGetAllPackages } from '../../../services/package';
import { apiCreateNewWarehouse } from '../../../services/warehouse';
import { apiCreateNewPoint } from '../../../services/transactionpoint';

const Account = () => {
  const [packages, setPackages] = useState([]);

  const payload = {
    name: 'Pho Yen 1',
    address: 'Pho Yen, Thai Nguyen',
    pointLeaderId: '3',
    warehouseId: '3'
  }

  useEffect(() => {
    
  }, []); // Tham số thứ hai là một array rỗng để chỉ chạy một lần khi component mount

  const handleSubmit = async () => {
    // Trong hàm này, bạn có thể sử dụng state packages đã được cập nhật.
    
    const fetchPackages = async () => {
      try {
        const response = await apiCreateNewPoint(payload);
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

    // Tiếp tục xử lý dữ liệu hoặc gọi các hàm khác tại đây...
  };

  console.log(packages);
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 'auto' }}>Account</h1>
      <button onClick={handleSubmit}>Click Me!</button>
    </div>
  );
};

export default Account;