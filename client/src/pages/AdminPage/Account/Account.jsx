import React, { useEffect, useState } from 'react';
import { apiGetAllPackages } from '../../../services/package';
import { apiCreateNewWarehouse, apiUpdateWarehouseById } from '../../../services/warehouse';
import { apiCreateNewPoint } from '../../../services/transactionpoint';
import { apiGetAllUsers } from '../../../services/user';

const Account = () => {
  const [allUsers, setAllUsers] = useState([]);

  const payload = {
    id: '4',
    // name: 'Song Cong',
    // address: 'Song Công, Thai Nguyen',
    // pointLeaderId: '3',
    // warehouseId: '3'
    leaderId: '3'
  }

  useEffect(() => {
    
  }, []); // Tham số thứ hai là một array rỗng để chỉ chạy một lần khi component mount

  const handleSubmit = async () => {
    // Trong hàm này, bạn có thể sử dụng state packages đã được cập nhật.
    
    const fetchUsers = async () => {
      try {
        const response = await apiGetAllUsers();
        const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        if (err === 0) {
          setAllUsers(data);

        } else {
          console.log(msg)
        }
        
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchUsers();

    // Tiếp tục xử lý dữ liệu hoặc gọi các hàm khác tại đây...
  };

  console.log(allUsers);
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 'auto' }}>Account</h1>
      <button onClick={handleSubmit}>Click Me!</button>
    </div>
  );
};

export default Account;