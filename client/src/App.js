import './App.css';
import { Home } from './pages/home/Home';
import Result from './pages/result/Result';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
