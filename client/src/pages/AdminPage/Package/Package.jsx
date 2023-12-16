import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import Modal from 'react-bootstrap/Modal';
// import Row from 'react-bootstrap/Row';
// import Form from 'react-bootstrap/Form';
// import { ChakraProvider } from "@chakra-ui/react";

import all_orders from '../../../constants/orders';
import { calculateRange, sliceData, nextPage, prevPage, lastPage, firstPage } from '../../../utils/table-pagination';
import './styles.css';
import DoneIcon from '../../../assets/icons/done.svg';
import CancelIcon from '../../../assets/icons/cancel.svg';
import RefundedIcon from '../../../assets/icons/refunded.svg';
import HeaderRole from '../../../conponents/HeaderRole/HeaderRole';
import CreateNewPackageModal from './Modal/CreateNewPackage/CreateNewPackage';
import UpdatePackageModal from './Modal/UpdatePackage/UpdatePackage';

function Package() {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
}

const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
}
    useEffect(() => {
        setPagination(calculateRange(all_orders, 4));
        setOrders(sliceData(all_orders, page, 4));
    }, [page]);

    // Search
    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let searchResults = all_orders.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(searchResults);
            setPagination(calculateRange(searchResults, 4));
            setPage(1); // Reset to the first page when searching
        } else {
            setOrders(sliceData(all_orders, page, 4));
            setPagination(calculateRange(all_orders, 4));
        }
    };
    // Change Page 
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

    const handleOpenDeleteModal = (order) => {
        setIsDelete(order);
    }
    const handleDelete = () => {
        if (setIsDelete) {
            // Tìm vị trí của đối tượng trong danh sách orders
            const index = orders.findIndex(order => order.id === setIsDelete.id);
            if (index !== -1) {
                // Tạo một bản sao của danh sách orders để tránh thay đổi trực tiếp state
                const updatedOrders = [...orders];
                // Xóa đối tượng khỏi danh sách
                updatedOrders.splice(index, 1);
                // Cập nhật state orders
                setOrders(updatedOrders);
            }
            // Đặt lại selectedOrderToDelete về null
            setIsDelete(null);
        }
    }

    return (
        <div className='dashboard-content'>
        <HeaderRole btnText={"Thêm đơn hàng"} variant="primary" onClick={handleOpenModal} />
        <CreateNewPackageModal
            // dialogClassName="modal-dialog-custom"
            show={isModalOpen}
            onHide={handleCloseModal}
            style={{ zIndex: 9999 }} // Add this line
        />
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Đơn hàng</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>CUSTOMER</th>
                        <th>REVENUE</th>
                    </thead>

                    {orders.length !== 0 ? (
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.id}</span></td>
                                    <td><span>{order.date}</span></td>
                                    <td>
                                        <div>
                                            {order.status === 'Paid' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon'
                                                />
                                                : order.status === 'Canceled' ?
                                                    <img
                                                        src={CancelIcon}
                                                        alt='canceled-icon'
                                                        className='dashboard-content-icon'
                                                    />
                                                    : order.status === 'Refunded' ?
                                                        <img
                                                            src={RefundedIcon}
                                                            alt='refunded-icon'
                                                            className='dashboard-content-icon'
                                                        />
                                                        : null}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img
                                                src={order.avatar}
                                                className='dashboard-content-avatar'
                                                alt={order.first_name + ' ' + order.last_name}
                                            />
                                            <span>{order.first_name} {order.last_name}</span>
                                        </div>
                                    </td>
                                    <td><span>${order.price}</span></td>
                                    <td>
                                   <ul class="list-inline m-0">
                                            <li class="list-inline-item">
                                                <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={handleOpenUpdateModal}><i class="fa fa-edit"></i></button>
                                            </li>
                                            <li class="list-inline-item">
                                                <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                                            </li>
                            </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : null}
                    <UpdatePackageModal
                    show={isUpdateModalOpen}
                    onHide={handleCloseUpdateModal}
                />
                </table>

                {orders.length !== 0 ? (
                    <div className='dashboard-content-footer'>
                        <span className="pagination" onClick={handleFirstPage} disabled={page === 1}>{'<<'}</span>
                        <span className="pagination" onClick={handlePrevPage} disabled={page === 1}>{'<'}</span>
                        {calculateRange(all_orders, 4).map((item, index) => (
                            <span
                                key={index}
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => handleChangePage(item)}>
                                {item}
                            </span>
                        ))}
                        <span className="pagination" onClick={handleNextPage} disabled={page === pagination.length}>{'>'}</span>
                        <span className="pagination" onClick={handleLastPage} disabled={page === pagination.length}>{'>>'}</span>
                    </div>
                ) : (
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Package;
