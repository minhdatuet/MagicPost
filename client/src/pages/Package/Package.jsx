import React, { useState, useEffect } from 'react';

import all_orders from '../../constants/orders';
import { calculateRange, sliceData, nextPage, prevPage } from '../../utils/table-pagination';

import './styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';
import HeaderRole from '../../conponents/HeaderRole/HeaderRole';

function Package() {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        setPagination(calculateRange(all_orders, 5));
        setOrders(sliceData(all_orders, page, 5));
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
            setPagination(calculateRange(searchResults, 5));
            setPage(1); // Reset to the first page when searching
        } else {
            setOrders(sliceData(all_orders, page, 5));
            setPagination(calculateRange(all_orders, 5));
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

    return (
        <div className='dashboard-content'>
        <HeaderRole btnText={"Đơn hàng mới"}/>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Orders List</h2>
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
                                </tr>
                            ))}
                        </tbody>
                    ) : null}
                </table>

                {orders.length !== 0 ? (
                    <div className='dashboard-content-footer'>
                        <button onClick={handlePrevPage} disabled={page === 1}>{'<<'}</button>
                        {calculateRange(all_orders, 5).map((item, index) => (
                            <span
                                key={index}
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => handleChangePage(item)}>
                                {item}
                            </span>
                        ))}
                        <button onClick={handleNextPage} disabled={page === pagination.length}>{'>>'}</button>
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
