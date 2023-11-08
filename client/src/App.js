import Header from "./conponents/Header/Header";
import {Routes, Route} from 'react-router-dom'
import { Home } from "./pages/Home/Home";
import { routes } from "./routes";
import Button from "./conponents/Button/Button";
function App() {
  return (
    <div>
      <Header />
      
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          return (
            <Route path={route.path} element={<Page />}  />
          )
        })}
      </Routes>
    </div>
  );
}

export default App;
