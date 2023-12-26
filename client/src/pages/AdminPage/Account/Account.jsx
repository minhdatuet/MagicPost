// import React, { useEffect, useState } from 'react';
// import { apiGetAllPackages } from '../../../services/package';
// import {
//   calculateRange,
//   sliceData,
//   nextPage,
//   prevPage,
//   lastPage,
//   firstPage,
// } from "../../../utils/table-pagination";
// import "./styles.css";
// import { useNavigate } from 'react-router-dom'
// import DoneIcon from "../../../assets/icons/done.svg";
// import CancelIcon from "../../../assets/icons/cancel.svg";
// import RefundedIcon from "../../../assets/icons/refunded.svg";
// import HeaderRole from "../../../conponents/HeaderRole/HeaderRole";
// const Account = () => {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await apiGetAllPackages();
//         const data = response?.data.response;
//         const err = response?.data.err;
//         const msg = response?.data.msg;
//         if (err === 0) {
//           setPackages(data);
//         } else {
//           console.log(msg)
//         }
        
//       } catch (error) {
//         console.error('Error fetching packages:', error);
//       }
//     };
//     fetchPackages();
//   }, []); // Tham số thứ hai là một array rỗng để chỉ chạy một lần khi component mount

//   const handleSubmit = async () => {
//     console.log(packages);
//   };

//   return (
//     <div className="dashboard-content">
//     <HeaderRole
//       btnText={"Thêm đơn hàng"}
//       variant="primary"
//       onClick={handleOpenModal}
//     />
//     <div className="dashboard-content-container">
//       <div className="dashboard-content-header">
//         <h2>Đơn hàng</h2>
//         <div className="dashboard-content-search">
//           <input
//             type="text"
//             value={search}
//             placeholder="Search.."
//             className="dashboard-content-input"
//             onChange={handleSearch}
//           />
//         </div>
//       </div>
//       <table>
//         <thead>
//           <th>ID</th>
//           <th>TRẠNG THÁI</th>
//           <th>NGƯỜI GỬI</th>
//           <th>NGƯỜI NHẬN</th>
//           <th>GIÁ TRỊ</th>
//         </thead>

//         {orders.length !== 0 ? (
//           <tbody>
//             {orders.map((order, index) => (
//               <tr key={index}>
//                 <td>
//                   <span>{order.id}</span>
//                 </td>
//                 <td>
//                   <div>
//                     {order?.Status?.nameOfStatus === "DELIVERING" ? (
//                       <img
//                         src={DoneIcon}
//                         alt="paid-icon"
//                         className="dashboard-content-icon"
//                       />
//                     ) : order?.Status?.nameOfStatus === "FAILED" ? (
//                       <img
//                         src={CancelIcon}
//                         alt="canceled-icon"
//                         className="dashboard-content-icon"
//                       />
//                     ) : order?.Status?.nameOfStatus === "Refunded" ? (
//                       <img
//                         src={RefundedIcon}
//                         alt="refunded-icon"
//                         className="dashboard-content-icon"
//                       />
//                     ) : null}
//                     <span>{order?.Status?.nameOfStatus}</span>
//                   </div>
//                 </td>
//                 <td>
//                   <span>{order.sender.name}</span>
//                 </td>
//                 <td>
//                   <span>{order.receiver.name}</span>
//                 </td>
//                 <td>
//                   <span>${order.shippingCost}</span>
//                 </td>
//                 <td>
//                   <ul class="list-inline m-0">
//                     <li className="list-inline-item">
//                       <button
//                         className="btn btn-secondary btn-sm rounded-0"
//                         type="button"
//                         data-toggle="tooltip"
//                         data-placement="top"
//                         title="View All"
//                         onClick={(e) => handleShowInfoPackage(order)}
//                       >
//                         <i className="fa fa-eye"></i>
//                         {/* Use the appropriate icon class here */}
//                       </button>
//                     </li>
//                     <li class="list-inline-item">
//                       <button
//                         class="btn btn-secondary btn-sm rounded-0"
//                         type="button"
//                         data-toggle="tooltip"
//                         data-placement="top"
//                         title="Edit"
//                         onClick={() => handleOpenUpdateModal(order)}
//                       >
//                         <i class="fa fa-edit"></i>
//                       </button>
//                     </li>
//                     <li class="list-inline-item">
//                       <button
//                         class="btn btn-secondary btn-sm rounded-0"
//                         type="button"
//                         data-toggle="tooltip"
//                         data-placement="top"
//                         title="Delete"
//                         onClick={() => { handleDelete(order.id) }}
//                       >
//                         <i class="fa fa-trash"></i>
//                       </button>
//                     </li>
//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         ) : null}
//         </table>

//       {orders.length !== 0 ? (
//         <div className="dashboard-content-footer">
//           <span
//             className="pagination"
//             onClick={handleFirstPage}
//             disabled={page === 1}
//           >
//             {"<<"}
//           </span>
//           <span
//             className="pagination"
//             onClick={handlePrevPage}
//             disabled={page === 1}
//           >
//             {"<"}
//           </span>
//           {calculateRange(packages, 4).map((item, index) => (
//             <span
//               key={index}
//               className={item === page ? "active-pagination" : "pagination"}
//               onClick={() => handleChangePage(item)}
//             >
//               {item}
//             </span>
//           ))}
//           <span
//             className="pagination"
//             onClick={handleNextPage}
//             disabled={page === pagination.length}
//           >
//             {">"}
//           </span>
//           <span
//             className="pagination"
//             onClick={handleLastPage}
//             disabled={page === pagination.length}
//           >
//             {">>"}
//           </span>
//         </div>
//       ) : (
//         <div className="dashboard-content-footer">
//           <span className="empty-table">No data</span>
//         </div>
//       )}
//     </div>
//   </div>
//   );
// };

// export default Account;