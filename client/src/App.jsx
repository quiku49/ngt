
import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { Mastermind } from './mastermind'
import { Login } from './login'
import "../style.css";


const Home = () => (
  <React.Fragment>
    <h1>Bienvenido</h1>
    <Link to="/mastermind">Ir a Otra Página</Link>
    <br />
    <Link to="/login">Login</Link>
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

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mastermind" element={<MasterMind />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
