import React from 'react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function InputField({ label, value, onChange }: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue >= 0) {
      onChange(Math.round(inputValue));
    }
  };

  return (
    <label>
      {label}
      <input type="number" value={value} onChange={handleChange} />
    </label>
  );
}