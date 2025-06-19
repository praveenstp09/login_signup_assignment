import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import app from "./firebase";
import "./App.css";
import { Routes, Route, Link } from 'react-router-dom'
import Landing from "./Screen/Landing";
import Login from "./Screen/Login";
import SignUp from "./Screen/SignUp";
import Profile from "./Screen/Profile";

function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[375px] min-h-screen border-gray-950 bg-[#F7F8F9]">
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
