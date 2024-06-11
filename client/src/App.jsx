
import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { Mastermind } from './mastermind/mastermind'
import { Login } from './auth/login'
import { Register } from './auth/register'
import { Home } from './home';
import { MMHome } from './mastermind/mmhome'
import { Friends } from './friends/friends';
import { Ngt } from "./ngt";
import "../style.css";


const Main = () => (
  <React.Fragment>
    <Ngt />
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
const FriendsPage = () => (
  <React.Fragment>
    <Friends />
  </React.Fragment>
)
const MasterMindHome = () => (
  <React.Fragment>
    <MMHome />
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
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/mmhome" element={<MasterMindHome />} />
      </Routes>
    </Router>
  )
}

export default App
