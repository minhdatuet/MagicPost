import React from 'react';
import Header from "./conponents/Header/Header";
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, bossRoutes } from "./routes";
import Footer from "./conponents/Footer/Footer";
import Sidebar from "./conponents/Sidebar/Sidebar";
import DashBoardAdmin from "./pages/AdminPage/Dashboard/DashBoardAdmin";
import './App.css'

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
    </Routes>
  );
}

export default App;
