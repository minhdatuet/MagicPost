import React from 'react';
import Header from "./conponents/Header/Header";
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, bossRoutes} from "./routes";
import Footer from "./conponents/Footer/Footer";
import Sidebar from "./conponents/Sidebar/Sidebar";
import DashBoardAdmin from "./pages/AdminPage/Dashboard/DashBoardAdmin";
import './App.css'
import runner from './assets/images/runner.gif'

function App() {
  return (
    <Routes>
      {localStorage.getItem('role') === 'BOSS' ? (
        <Route
          path="*"
          element={
            <div className='dashboard-container'>
              <div>
                <Sidebar/>
              </div>
              <div className='dashboard-body'>
                <Routes>
                  {bossRoutes.map((route, i) => (
                    <Route key={i} path={route.path} element={<route.page />} />
                  ))}
                </Routes>
              </div>
            </div>
          }
        />
      ) : (
        <Route
          path="*"
          element={
            <div>
              <Header />
              <Routes>
                {publicRoutes.map((route, i) => (
                  <Route key={i} path={route.path} element={<route.page />} />
                ))}
              </Routes>
              <Footer />
            </div>
          }
        />
      )}
      <Route
          path="/loading"
          element={
            <div className='loading'>
              <div className='loadingLogo'>
                <div className='loadingPost'>
                  <h1>Bạn có biết?</h1>
                  <br></br>
                  <p>Magic Post là đơn vị vận chuyển có số lượng người dùng trong năm 2023 cao nhất việt nam</p>
                </div>
                <img src={runner} alt="" />
              </div>
              <div className = "loader"></div> 
            </div>
          }
      />
    </Routes>
  );
}

export default App;
