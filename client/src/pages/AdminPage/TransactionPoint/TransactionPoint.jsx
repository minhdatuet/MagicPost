import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { calculateRange, sliceData, nextPage, prevPage, firstPage, lastPage } from '../../../utils/table-pagination';

import HeaderRole from '../../../conponents/HeaderRole/HeaderRole';
import { getAllTransactionPoints } from "../../../store/actions";
import ShowInfoTransactionPoint from "./ShowInfoTransactionPoint/ShowInfoTransactionPoint"

function TransactionPoint() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const { transactionPoints } = useSelector((state) => state.transactionPoint);
    const [transactions, setTransactions] = useState(transactionPoints);
    const [showInfoTransactionPoint, setShowInfoTransactionPoint] = useState(false);
    const [selectedTransactionPoint, setSelectedTransactionPoint] = useState(null);
    useEffect(() => {
        dispatch(getAllTransactionPoints());
    }, []);
    console.log(transactionPoints);

    useEffect(() => {
        setPagination(calculateRange(transactionPoints, 4));
        setTransactions(sliceData(transactionPoints, page, 4));
    }, [page, transactionPoints]);

    // Search
    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let searchResults = transactionPoints.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.leader.toLowerCase().includes(search.toLowerCase())
            );
            setTransactions(searchResults);
            setPagination(calculateRange(searchResults, 4));
            setPage(1); // Reset to the first page when searching
        } else {
            setTransactions(sliceData(transactionPoints, page, 4));
            setPagination(calculateRange(transactionPoints, 4));
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

    const handleCloseShowInfoModal = () => {
        setShowInfoTransactionPoint(false);
    }

    const onHandlerShowInfoTransactionPoint = (transaction) => {
        setShowInfoTransactionPoint(true);
        setSelectedTransactionPoint(transaction)
    }

    const renderPagination = () => {
        const totalButtons = 3; // Number of buttons to display
        const halfButtons = Math.floor(totalButtons / 2);
        const start = Math.max(1, page - halfButtons);
        const end = Math.min(start + totalButtons - 1, pagination.length);

        const buttons = [];

        for (let i = start; i <= end; i++) {
            buttons.push(
                <span
                    key={i}
                    className={i === page ? 'active-pagination' : 'pagination'}
                    onClick={() => handleChangePage(i)}>
                    {i}
                </span>
            );
        }

        if (start > 1) {
            buttons.unshift(<span key="start" className="pagination-disabled"></span>);
        }
        if (end < pagination.length) {
            buttons.push(<span key="end" className="pagination-disabled"></span>);
        }

        return buttons;
    };

    return (
        <div className='dashboard-content'>
            <HeaderRole
                btnText="Thêm điểm giao dịch" />
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>

                    <h2>Điểm giao dịch</h2>
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
                        <th>TÊN KHO HÀNG</th>
                        <th>TÊN TRƯỞNG ĐIỂM</th>
                        <th>TÊN ĐIỂM</th>
                        <th>ĐỊA CHỈ</th>
                    </thead>

                    {transactions.length !== 0 ? (
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td><span>{transaction.id}</span></td>
                                    <td><span>{transaction.Warehouse.name}</span></td>
                                    <td><span>{transaction.pointLeader.name}</span></td>
                                    <td><span>{transaction.name}</span></td>
                                    <td><span>{transaction.address}</span></td>
                                    <td>
                                        <ul class="list-inline m-0">
                                            <li className="list-inline-item">
                                                <button className="btn btn-secondary btn-sm rounded-0"
                                                    type="button" data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Eye"
                                                    onClick={(e) => onHandlerShowInfoTransactionPoint(transaction)}><i class="fa fa-eye"></i></button>
                                            </li>
                                            <li class="list-inline-item">
                                                <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" ><i class="fa fa-edit"></i></button>
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
                </table>

                <ShowInfoTransactionPoint
                        show={showInfoTransactionPoint}
                        onHide={handleCloseShowInfoModal}
                        transactionPoint ={selectedTransactionPoint}
                />

                {transactions.length !== 0 ? (
                    <div className='dashboard-content-footer'>
                        <span className="pagination" onClick={handleFirstPage} disabled={page === 1}>{'<<'}</span>
                        <span className="pagination" onClick={handlePrevPage} disabled={page === 1}>{'<'}</span>
                        {renderPagination()}
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

export default TransactionPoint;