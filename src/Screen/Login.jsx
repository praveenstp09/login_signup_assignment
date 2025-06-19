import React, { useState,navigate } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./../firebase";
import Input from "../custom-component/Input";
import Button from "../custom-component/Button";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"

const auth = getAuth(app);

const Login = () => {
    const navigate = useNavigate();
  const [form, setFrom] = useState({
    email: "",
    password: "",
  });

  const [loading,setLoading]=useState(false);
  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      console.log("Logged in user:", user);
      setLoading(false)
      toast("Login successful !! ✅ ")
      navigate('/profile')
    } catch (error) {
      setLoading(false)
      toast.error(`login failed : ${error.message}`)
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-6 p-4 pt-6 box-border">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-medium text-[28px]">Signin to your</h1>
          <h1 className="font-medium text-[28px]">popX account</h1>
        </div>
        <p className="font-normal text-[18px] opacity-60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          alias mollitia.
        </p>
      </div>
      <div>
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter email address"
          name="email"
          onChange={handleChange}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <Button
          onClick={handleClick}
          className="bg-[#cbcbcb] text-[16px] font-medium text-white hover:bg-[#6C25FF]"
        >
          {loading ? "Authenticating...":"Login"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
