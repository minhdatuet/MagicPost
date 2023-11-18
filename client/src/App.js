import Header from "./conponents/Header/Header";
import {Routes, Route, Router} from 'react-router-dom'
import { Home } from "./pages/Home/Home";
import { routes } from "./routes";
import Button from "./conponents/Button/Button";
import Sidebar from "./conponents/Sidebar/Sidebar";
import Package from "./pages/Package/Package";
import './App.css'
import Warehouse from "./pages/Warehouse/Warehouse";
import TransactionPoint from "./pages/TransactionPoint";
import Account from "./pages/Account";
import DashBoardAdmin from "./pages/AdminPage/Dashboard/DashBoardAdmin";
function App() {
  return (
      <div className='dashboard-container'>
      <div>
      <Sidebar/>
      </div>
          <div className='dashboard-body'>
              <Routes>
                  <Route path="/" element={<DashBoardAdmin/>} />
                  <Route path="/warehouse" element={<Warehouse/>} />
                  <Route path="/package" element={<Package/>} />
                  <Route exact path="/transaction" element={<TransactionPoint/>} />
                  <Route exact path="/account" element={<Account/>} />
              </Routes>
          </div>
      </div>
  );
}

export default App;
