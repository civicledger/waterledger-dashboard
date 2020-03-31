import React from 'react';

const FieldLabel = ({text, forField}) => {
  return (
    <label className="block text-gray-800 text-sm mb-3 mt-6" htmlFor={forField}>{text}</label>
  );
}

export default FieldLabel;