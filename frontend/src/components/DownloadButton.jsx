import React from 'react';

const DownloadButton = ({ uploadedFile, inputText, setGeneratedFileUrl, setIsLoading, setError }) => {
  const [downloadUrl, setDownloadUrl] = React.useState(null);
  const [isLoading, setLocalIsLoading] = React.useState(false);

  const handleGenerate = async () => {
    setLocalIsLoading(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          originalVoicePath: uploadedFile,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setDownloadUrl(data.downloadUrl);
      setGeneratedFileUrl(data.downloadUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setLocalIsLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
                 transition-all transform hover:scale-105 active:scale-95 
                 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed
                 focus:outline-none focus:ring-2 focus:ring-blue-300"
        disabled={!uploadedFile || !inputText || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            <span>Generating...</span>
          </div>
        ) : (
          'Generate Voice'
        )}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded 
                   hover:bg-green-600 transition-all transform hover:scale-105 
                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Download Generated Voice
        </a>
      )}
    </div>
  );
};

export default DownloadButton;
