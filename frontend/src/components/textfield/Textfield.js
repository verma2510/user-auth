import React from "react";

export const Textfield = ({
  title,
  placeholder,
  name,
  value,
  onChange,
  type,
}) => {
  return (
    <div className="propTextfield">
      <p>{title ? title : "Title"}</p>
      <input
        placeholder={placeholder ? placeholder : "Type here"}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};
