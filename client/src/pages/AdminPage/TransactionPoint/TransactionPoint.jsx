import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import all_warehouse from '../../../constants/warehouses';
import { calculateRange, sliceData, nextPage, prevPage, firstPage, lastPage} from '../../../utils/table-pagination';

// import './style.css';
import HeaderRole from '../../../conponents/HeaderRole/HeaderRole';

function Warehouse() {
    const [search, setSearch] = useState('');
    const [warehouses, setWarehouses] = useState(all_warehouse);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        setPagination(calculateRange(all_warehouse, 4));
        setWarehouses(sliceData(all_warehouse, page, 4));
    }, [page]);

    // Search
    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let searchResults = all_warehouse.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.leader.toLowerCase().includes(search.toLowerCase())
            );
            setWarehouses(searchResults);
            setPagination(calculateRange(searchResults, 4));
            setPage(1); // Reset to the first page when searching
        } else {
            setWarehouses(sliceData(all_warehouse, page, 4));
            setPagination(calculateRange(all_warehouse, 4));
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
                        <th>ID KHO HÀNG</th>
                        <th>ID TRƯỞNG ĐIỂM</th>
                        <th>TÊN ĐIỂM</th>
                        <th>ĐỊA CHỈ</th>
                    </thead>

                    {warehouses.length !== 0 ? (
                        <tbody>
                            {warehouses.map((warehouse, index) => (
                                <tr key={index}>
                                    <td><span>{warehouse.id}</span></td>
                                    <td><span>{warehouse.name}</span></td>
                                    <td><span>{warehouse.email}</span></td>
                                    <td><span>{warehouse.leader}</span></td>
                                    <td><span>{warehouse.leader}</span></td>
                                    <td>
                                        <ul class="list-inline m-0">
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

                {warehouses.length !== 0 ? (
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

export default Warehouse;
