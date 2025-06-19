import React from "react";

const Input = ({ type, placeholder, name, label, value, onChange,required }) => {
  return (
    <div className="relative mb-6">
      <label className="absolute left-3 top-0 text-[13px] text-purple-600 bg-[#f7f8f9] px-1 transform -translate-y-1/2 pointer-events-none">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className="w-full border rounded px-3 pt-4 pb-2 text-[14px] text-gray-800 placeholder-gray-400 focus:outline"
      />
    </div>
  );
};

export default Input;
