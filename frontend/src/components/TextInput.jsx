// src/components/TextInput.js
import React from 'react';

const TextInput = ({ value, onChange, maxLength }) => {
  return (
    <div className="mt-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder="Enter text to convert to speech..."
        className="w-full p-4 border border-purple-200 rounded-lg h-32 resize-none 
                 focus:ring-2 focus:ring-purple-500 focus:border-transparent
                 transition-all duration-300 placeholder-purple-300"
      />
      <div className="flex justify-end">
        <p className="text-sm text-purple-600 mt-2">
          {value.length}/{maxLength} characters
        </p>
      </div>
    </div>
  );
};

export default TextInput;
