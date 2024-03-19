import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { Mastermind } from './mastermind'
import { Login } from './login'
import "../style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));


const Home = () => (
  <React.Fragment>
    <h1>Bienvenido</h1>
    <Link to="/mastermind">Ir a Otra Página</Link>
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
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mastermind" element={<MasterMind />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>

);

root.render(
  <React.Fragment>
    <App />
  </React.Fragment>
);