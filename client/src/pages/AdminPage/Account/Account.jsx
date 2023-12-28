import React, { useEffect, useState } from 'react';
import { apiGetAllUsers } from '../../../services/user';
import {
  calculateRange,
  sliceData,
  nextPage,
  prevPage,
  lastPage,
  firstPage,
} from '../../../utils/table-pagination';
import HeaderRole from '../../../conponents/HeaderRole/HeaderRole';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      // const warehouseId = localStorage.getItem('warehouseId')
      try {
        const response = await apiGetAllUsers()
        const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data)
        if (err === 0) {
          setUsers(data)
        } else {
          console.log(msg)
        }

      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setPagination(calculateRange(users, 4));
    setAccounts(sliceData(users, page, 4));
  }, [page, users]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') {
      let searchResults = users.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.phone.toLowerCase().includes(search.toLowerCase()) ||
          item.accountType.toLowerCase().includes(search.toLowerCase()) ||
          item.address.toLowerCase().includes(search.toLowerCase())
      );
      setAccounts(searchResults);
      setPagination(calculateRange(searchResults, 4));
      setPage(1);
    } else {
      setAccounts(sliceData(users, page, 4));
      setPagination(calculateRange(users, 4));
    }
  };

  const handleChangePage = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleNextPage = () => {
    nextPage(page, pagination.length, setPage);
  };

  const handlePrevPage = () => {
    prevPage(page, setPage);
  };

  const handleLastPage = () => {
    lastPage(page, pagination.length, setPage);
  };

  const handleFirstPage = () => {
    firstPage(page, setPage);
  };

  return (
    <div className="dashboard-content">
      <HeaderRole
        btnText={'Thêm tài khoản'}
        variant="primary"
        onClick={handleOpenModal}
      />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Đơn hàng</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={handleSearch}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN</th>
              <th>SỐ ĐIỆN THOẠI</th>
              <th>CHỨC VỤ</th>
              <th>NƠI LÀM VIỆC</th>
            </tr>
          </thead>
          {accounts.length !== 0 ? (
            <tbody>
              {accounts.map((account, index) => (
                <tr key={index}>
                  <td>
                    <span>{account.id}</span>
                  </td>
                  <td>
                    <span>{account.name}</span>
                  </td>
                  <td>
                    <span>{account.phone}</span>
                  </td>
                  <td>
                    <span>{account.accountType}</span>
                  </td>
                  <td>
                    <span>{account.address}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        {accounts.length !== 0 ? (
          <div className="dashboard-content-footer">
            <span
              className="pagination"
              onClick={handleFirstPage}
              disabled={page === 1}
            >
              {'<<'}
            </span>
            <span
              className="pagination"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              {'<'}
            </span>
            {calculateRange(accounts, 4).map((item, index) => (
              <span
                key={index}
                className={item === page ? 'active-pagination' : 'pagination'}
                onClick={() => handleChangePage(item)}
              >
                {item}
              </span>
            ))}
            <span
              className="pagination"
              onClick={handleNextPage}
              disabled={page === pagination.length}
            >
              {'>'}
            </span>
            <span
              className="pagination"
              onClick={handleLastPage}
              disabled={page === pagination.length}
            >
              {'>>'}
            </span>
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
