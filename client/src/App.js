import './App.css';
import '../src/styles/chat.css'
import '../src/styles/login-register.css'
import '../src/styles/modal.css'
import '../src/styles/navigation.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {

  return (
    <BrowserRouter>
      <>
        <div className="container">
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Chat />}></Route>
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
