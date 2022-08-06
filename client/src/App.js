import './App.css';
import { Home } from './pages/home/Home';
import Result from './pages/result/Result';
import LoginPage from './pages/loginPage/loginPage';
import Admin from './pages/admin/Admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<Result />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
