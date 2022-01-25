import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Lists from './pages/Lists';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    </div>
  );
}

export default App;
