import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Customer from './routes/Customer';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Customer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
