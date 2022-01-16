import React from 'react';

function SelectField({ value, label }) {
  return <option value={value}>{label}</option>;
}

export default SelectField;
