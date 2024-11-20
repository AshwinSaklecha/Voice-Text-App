import React, { useState } from 'react';
import UploadFile from './components/UploadFile.jsx';
import TextInput from './components/TextInput.jsx';
import DownloadButton from './components/DownloadButton.jsx';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [generatedFileUrl, setGeneratedFileUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            Voice Conversion
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-4"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="bg-white/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Upload Voice File</h2>
            <UploadFile onFileUpload={setUploadedFile} setError={setError} />
          </div>

          {/* Text Input Section */}
          <div className="bg-white/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Enter Text</h2>
            <TextInput value={inputText} onChange={setInputText} maxLength={500} />
          </div>

          {/* Generate Button Section */}
          {uploadedFile && inputText && (
            <div className="bg-white/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Generate Voice</h2>
              <DownloadButton 
                uploadedFile={uploadedFile}
                inputText={inputText}
                setGeneratedFileUrl={setGeneratedFileUrl}
                setIsLoading={setIsLoading}
                setError={setError}
              />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="animate-shake">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                </svg>
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
