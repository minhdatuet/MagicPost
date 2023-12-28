import React, { useState, useEffect } from "react";
import {
  calculateRange,
  sliceData,
  nextPage,
  prevPage,
  lastPage,
  firstPage,
} from "../../../utils/table-pagination";
import "./styles.css";
import { useNavigate } from 'react-router-dom'
import DoneIcon from "../../../assets/icons/done.svg";
import CancelIcon from "../../../assets/icons/cancel.svg";
import RefundedIcon from "../../../assets/icons/refunded.svg";
import HeaderRole from "../../../conponents/HeaderRole/HeaderRole";
import CreateNewPackageModal from "./Modal/CreateNewPackage/CreateNewPackage";
import UpdatePackageModal from "./Modal/UpdatePackage/UpdatePackage";
import { apiDeletePackage, apiGetAllPackages } from "../../../services/package";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages } from "../../../store/actions/package";
import ShowInfoPackage from "../../AdminPage/Package/Modal/ShowInfoPackage/ShowInfoPackage"
import {
  getAllTransactionPoints,
  getAllWarehouses,
} from "../../../store/actions";

function Package() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages } = useSelector((state) => state.package);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [packages, setAllOrders] = useState([]);
  const [isDelete, setIsDelete] = useState();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [orders, setOrders] = useState(packages);
  const [showInfoPackage, setShowInfoPackage] = useState(false);
  const [statusPackage, setStatusPackage] = useState('');

  useEffect(() => {
    dispatch(getAllPackages());
  }, []);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowInfoPackage(false);
  };

  const handleOpenUpdateModal = (order) => {
    setIsUpdateModalOpen(true);
    console.log(order)
    setSelectedPackage(order)
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);

  }
  useEffect(() => {
    setPagination(calculateRange(packages, 4));
    setOrders(sliceData(packages, page, 4));
  }, [page, packages]);

  // Search
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let searchResults = packages.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.product.toLowerCase().includes(search.toLowerCase())
      );
      setOrders(searchResults);
      setPagination(calculateRange(searchResults, 4));
      setPage(1); 
    } else {
      setOrders(sliceData(packages, page, 4));
      setPagination(calculateRange(packages, 4));
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
    console.log('YES')
    setIsDelete(order);
    console.log(order);
    console.log(isDelete);
  };
  const handleDelete = (id) => {
    apiDeletePackage(id)
    window.location.reload();
    /*  if (setIsDelete) {
  
        // Tìm vị trí của đối tượng trong danh sách orders
        const index = orders.findIndex((order) => order.id === setIsDelete.id);
        console.log(isDelete)
        if (index !== -1) {
          // Tạo một bản sao của danh sách orders để tránh thay đổi trực tiếp state
          const updatedOrders = [...orders];
          // Xóa đối tượng khỏi danh sách
          apiDeletePackage(index);
          // Cập nhật state orders
          setOrders(updatedOrders);
        }
        // Đặt lại selectedOrderToDelete về null
        setIsDelete(null);
      } */
  };
  const handleShowInfoPackage = (order) => {
    // console.log(order);
    setSelectedPackage(order)
    const statusTimes = [
      [order.Status.datePointEndReceived,
      order.transactionPointEnd && order.transactionPointEnd?.name ? order.transactionPointEnd?.name + " đang chuyển đơn hàng." : null],
  
      [order.Status.dateReceiverReturn, 'Người nhận trả lại hàng lúc ' + order.Status.dateReceiverReturn],
  
      [order.Status.dateSendPackage, 'Người gửi gửi đơn hàng tại điểm giao dịch ' + order.transactionPointStart?.name + " lúc " + order.Status.dateSendPackage],
  
      [order.Status.dateSendToPointEnd,
      order.transactionPointEnd && order.transactionPointEnd?.name ? 
      "Đơn hàng chuyển tới điểm giao dịch " + order.transactionPointEnd?.name + " lúc " +  order.transactionPointEnd: null],
  
      [order.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận lúc " + order.Status.dateSendToReceiver],
  
      [order.Status.dateSendToWarehouseEnd, order.warehouseEnd && order.warehouseEnd?.name ? 
      "Đơn hàng rời khỏi kho " + order.warehouseStart?.name +  " lúc " + order.Status.dateSendToWarehouseEnd : null],
  
      [order.Status.dateSendToWarehouseStart, order.warehouseStart && order.warehouseStart?.name ? 
      "Đơn hàng rời khỏi điểm giao dịch " + order.transactionPointStart?.name +  " lúc " + order.Status.dateSendToWarehouseStart : null],
  
      [order.Status.dateWarehouseEndReceived, order.warehouseEnd && order.warehouseEnd?.name ? 
      "Đơn hàng nhập kho " + order.warehouseEnd?.name + " lúc " + order.Status.dateWarehouseEndReceived: null],
  
      [order.Status.dateWarehouseStartReceived, order.warehouseStart && order.warehouseStart?.name ? 
      "Đơn hàng nhập kho " + order.warehouseStart?.name + " lúc " + order.Status.dateWarehouseStartReceived : null],
  
      [order.Status.receivedDate, "Đơn hàng được trả lại lúc " + order.Status.receivedDate]
    ];
  
    const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);
  
    filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setStatusPackage(filteredStatusTimes);
    setShowInfoPackage(true)
    
  };


  return (
    <div className="dashboard-content">
      <HeaderRole
        btnText={"Thêm đơn hàng"}
        variant="primary"
        onClick={handleOpenModal}
      />
      <CreateNewPackageModal
        // dialogClassName="modal-dialog-custom"
        show={isModalOpen}
        onHide={handleCloseModal}
        style={{ zIndex: 9999 }} // Add this line
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
            <th>ID</th>
            <th>TRẠNG THÁI</th>
            <th>NGƯỜI GỬI</th>
            <th>NGƯỜI NHẬN</th>
            <th>GIÁ TRỊ</th>
          </thead>

          {orders.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span>{order.id}</span>
                  </td>
                  <td>
                    <div>
                      {order?.Status?.nameOfStatus === "DELIVERING" ? (
                        <img
                          src={DoneIcon}
                          alt="paid-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order?.Status?.nameOfStatus === "FAILED" ? (
                        <img
                          src={CancelIcon}
                          alt="canceled-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order?.Status?.nameOfStatus === "Refunded" ? (
                        <img
                          src={RefundedIcon}
                          alt="refunded-icon"
                          className="dashboard-content-icon"
                        />
                      ) : null}
                      <span>{order?.Status?.nameOfStatus}</span>
                    </div>
                  </td>
                  <td>
                    <span>{order.sender?.name}</span>
                  </td>
                  <td>
                    <span>{order.receiver?.name}</span>
                  </td>
                  <td>
                    <span>${order.shippingCost}</span>
                  </td>
                  <td>
                    <ul class="list-inline m-0">
                      <li className="list-inline-item">
                        <button
                          className="btn btn-secondary btn-sm rounded-0"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="View All"
                          onClick={(e) => handleShowInfoPackage(order)}
                        >
                          <i className="fa fa-eye"></i>
                          {/* Use the appropriate icon class here */}
                        </button>
                      </li>
                      <li class="list-inline-item">
                        <button
                          class="btn btn-secondary btn-sm rounded-0"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                          onClick={() => handleOpenUpdateModal(order)}
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                      </li>
                      <li class="list-inline-item">
                        <button
                          class="btn btn-secondary btn-sm rounded-0"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => { handleDelete(order.id) }}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
          <ShowInfoPackage
            show={showInfoPackage}
            order = {selectedPackage}
            statusPackage = {statusPackage}
            onHide={handleCloseModal}
          />
          <UpdatePackageModal
            show={isUpdateModalOpen}
            order = {selectedPackage}
            onHide={handleCloseUpdateModal}
          />
        </table>

        {orders.length !== 0 ? (
          <div className="dashboard-content-footer">
            <span
              className="pagination"
              onClick={handleFirstPage}
              disabled={page === 1}
            >
              {"<<"}
            </span>
            <span
              className="pagination"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              {"<"}
            </span>
            {calculateRange(packages, 4).map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
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
              {">"}
            </span>
            <span
              className="pagination"
              onClick={handleLastPage}
              disabled={page === pagination.length}
            >
              {">>"}
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
}

export default Package;