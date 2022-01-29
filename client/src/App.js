import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Lists from './pages/Lists';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Social from './pages/Social';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/social" element={<Social />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
