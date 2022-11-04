import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Customer from './routes/Customer';
import Orders from './routes/Orders';
import EmployeeLogin from './routes/EmployeeLogin';
import TestEmployeePage from './routes/TestEmployee';
import Checkout from './routes/Checkout';
import Server from './routes/Server';

// Act as router for project
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Customer/>}/>
        <Route path="/orders" element={<Orders/>} />
        <Route path="/server" element={<Server/>} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/testemployeepage" element={<TestEmployeePage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
