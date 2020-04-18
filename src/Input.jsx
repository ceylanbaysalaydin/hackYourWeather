import React from 'react';

export default function Input({ inputValue, setInputValue }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  return (
    <input
      className="searchInput"
      name="searchInput"
      type="search"
      placeholder="Search City"
      onChange={handleChange}
      value={inputValue}
      required
    />
  );
}
