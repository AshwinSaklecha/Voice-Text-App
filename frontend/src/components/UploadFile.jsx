// src/components/UploadFile.js
import React, { useState } from 'react';

const UploadFile = ({ onFileUpload, setError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploadSuccess(false);
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('voiceFile', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      onFileUpload(data.filePath);
      setUploadSuccess(true);
      setUploadProgress(100);
    } catch (error) {
      setError(error.message);
      setUploadSuccess(false);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'}
          hover:border-blue-400 hover:bg-blue-50/50`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileUpload(e.dataTransfer.files[0]);
        }}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />
        <label 
          htmlFor="fileInput"
          className="cursor-pointer text-blue-600 hover:text-blue-800 
                   transition-colors duration-200 font-medium"
        >
          Click to upload
        </label>
        <p className="mt-2 text-sm text-gray-600">or drag and drop</p>
        <p className="mt-1 text-xs text-gray-500">Audio files only, up to 5MB</p>
      </div>

      {isUploading && (
        <div className="mt-2">
          <div className="h-2 bg-blue-100 rounded">
            <div 
              className="h-full bg-blue-500 rounded transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-blue-700 text-center mt-1">
            Uploading file...
          </p>
        </div>
      )}

      {uploadSuccess && (
        <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-center
                      animate-fadeIn transition-all duration-300">
          ✓ File uploaded successfully!
        </div>
      )}
    </div>
  );
};

export default UploadFile;
