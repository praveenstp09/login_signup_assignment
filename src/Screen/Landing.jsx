import React from "react";
import Button from "../custom-component/Button";
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path)
  };

  return (
    <div className="flex flex-col justify-end gap-6 p-4 text-[#1D2226] min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-[28px]">Welcome to popx</h1>
        <p className="text-[18px] font-normal opacity-60 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          alias mollitia.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <Button
          onClick={()=>handleClick('/signup')}
          className="bg-[#6C25FF] text-[16px] font-medium text-white"
        >
          Create Account
        </Button>
        <Button
          onClick={()=>handleClick('/login')}
          className="bg-[#cebafb] text-[16px]  font-medium"
        >
          Already Registered? Login
        </Button>
      </div>
    </div>
  );
};

export default Landing;
