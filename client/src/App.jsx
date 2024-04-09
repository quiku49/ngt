
import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { Mastermind } from './mastermind'
import { Login } from './login'
import { Register } from './register'
import { Home } from './home';
import "../style.css";


const Main = () => (
  <React.Fragment>
    <h1>Bienvenido</h1>
    <Link to="/home">Ir a Otra Página</Link>
    <br />
    <Link to="/login">Login</Link>
    <br />
    <Link to="/register">Registro</Link>
  </React.Fragment>
);
const HomePage = () => (
  <React.Fragment>
    <Home />
  </React.Fragment>
)
const LoginPage = () => (
  <React.Fragment>
    <Login />
  </React.Fragment>
)
const RegisterPage = () => (
  <React.Fragment>
    <Register />
  </React.Fragment>
)
const MasterMind = () => (
  <React.Fragment>
    <Mastermind />
  </React.Fragment>
)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mastermind" element={<MasterMind />} />
      </Routes>
    </Router>
  )
}

export default App
