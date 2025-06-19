import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import app from "./../firebase";
import Input from "../custom-component/Input";
import Button from "../custom-component/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const auth = getAuth(app);
const db = getDatabase(app);

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: null,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const { fullName, phone, email, password, isAgency } = form;

    if (!fullName || !phone || !email || !password || isAgency === null) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      toast.error(
        "Phone number must be exactly 10 digits and contain only numbers."
      );
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      console.log(user);

      await set(ref(db, "users/" + user.uid), {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        company: form.company,
        isAgency: form.isAgency === "yes",
      });
      setLoading(false);
      toast("Sign up successfully ✅ ");
      console.log("User created & data saved:", user.uid);
      navigate("/profile");
    } catch (err) {
      setLoading(false);
      toast.error(`sign up error : ${err.message}`);
      console.error("Signup error:", err.message);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-4 p-4 pt-6 box-border ">
      <div className="flex flex-col">
        <h1 className="font-medium text-[28px]">Create your</h1>
        <h1 className="font-medium text-[28px]">PopX account</h1>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          label="Full Name"
          name="fullName"
          required
          onChange={handleChange}
          placeholder="Enter your Full Name"
        />
        <Input
          type="text"
          label="Phone Number"
          name="phone"
          required
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        <Input
          type="email"
          label="Email Address"
          name="email"
          required
          onChange={handleChange}
          placeholder="Enter email address"
        />
        <Input
          type="password"
          label="Password"
          name="password"
          required
          onChange={handleChange}
          placeholder="Enter password"
        />
        <Input
          type="text"
          label="Company Name"
          name="company"
          onChange={handleChange}
          placeholder="Enter Company Name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>Are you an agency? <span className="text-red-500 ml-0.5">*</span></p>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            name="isAgency"
            value="yes"
            onChange={handleChange}
            className="accent-purple-600 w-4 h-4"
          />
          <label>Yes</label>
          <input
            type="radio"
            name="isAgency"
            value="no"
            onChange={handleChange}
            className="accent-purple-600 w-4 h-4"
          />
          <label>No</label>
        </div>
      </div>
      <Button
        className="bg-[#6c25ff] text-[16px] font-medium text-white"
        onClick={handleSubmit}
      >
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </div>
  );
};

export default SignUp;
