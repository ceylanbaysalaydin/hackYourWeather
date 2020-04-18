import React from 'react';

export default function Button({ onSubmit }) {
  return (
    <button className="searchButton" onClick={onSubmit} type="submit">
      Search
    </button>
  );
}
