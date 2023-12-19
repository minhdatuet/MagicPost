import React, { useState, useEffect } from 'react';
import { calculateRange, sliceData, nextPage, prevPage, firstPage, lastPage} from '../../../utils/table-pagination';

import './style.css';
import HeaderRole from '../../../conponents/HeaderRole/HeaderRole';
import CreateNewWarehouseModal from './Modal/CreateNewWarehouse/CreateNewWarehouse';
import UpdateWarehouseModal from './Modal/UpdateWarehouse/UpdateWarehouse';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWarehouses } from '../../../store/actions';

function Warehouse() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const { warehouses } = useSelector((state) => state.warehouse);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [warehouse, setWarehouse] = useState(warehouses);
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
        dispatch(getAllWarehouses());
    }, []);
    console.log(warehouses);

    useEffect(() => {
        setPagination(calculateRange(warehouses, 5));
        setWarehouse(sliceData(warehouses, page, 5));
    }, [page, warehouses]);

    // Search
    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let searchResults = warehouses.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.leader.toLowerCase().includes(search.toLowerCase())
            );
            setWarehouse(searchResults);
            setPagination(calculateRange(searchResults, 5));
            setPage(1); // Reset to the first page when searching
        } else {
            setWarehouse(sliceData(warehouses, page, 5));
            setPagination(calculateRange(warehouses, 5));
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
            btnText="Thêm kho hàng" onClick={setIsModalOpen}/>
            <CreateNewWarehouseModal
            // dialogClassName="modal-dialog-custom"
            show={isModalOpen}
            onHide={handleCloseModal}
            style={{ zIndex: 9999 }} // Add this line
        />
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Kho hàng</h2>
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
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>LEADER</th>
                    </thead>

                    {warehouses.length !== 0 ? (
                        <tbody>
                            {warehouses.map((warehouse, index) => (
                                <tr key={index}>
                                    <td><span>{warehouse.id}</span></td>
                                    <td><span>{warehouse.name}</span></td>
                                    <td><span>{warehouse.address}</span></td>
                                    <td><span>{warehouse.warehouseLeader.name}</span></td>
                                    <td>
                                        <ul class="list-inline m-0">
                                            <li class="list-inline-item">
                                                <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={setIsUpdateModalOpen}><i class="fa fa-edit"></i></button>
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
                    <UpdateWarehouseModal
                    show={isUpdateModalOpen}
                    onHide={handleCloseUpdateModal}
                />
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
