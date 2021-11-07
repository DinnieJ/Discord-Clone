import React from "react";
import './TextInput.scss'

const TextInput = ({setValue, className, ...props}) => {
  return (
    <input
      {...props}
      className={`text-input pl-2 h-10 bg-gray-600 rounded-lg text-white border-2 border-transparent focus:border-gray-300 ${className}`}
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
};

export default TextInput;
