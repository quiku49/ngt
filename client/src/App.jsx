
import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { Mastermind } from './mastermind'
import { Login } from './login'
import { Register } from './register'
import "../style.css";


const Home = () => (
  <React.Fragment>
    <h1>Bienvenido</h1>
    <Link to="/mastermind">Ir a Otra Página</Link>
    <br />
    <Link to="/login">Login</Link>
    <br />
    <Link to="/register">Registro</Link>
  </React.Fragment>
);

const MasterMind = () => (
  <React.Fragment>
    <h1>Mastermind</h1>
    <Mastermind />
  </React.Fragment>
);
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mastermind" element={<MasterMind />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
