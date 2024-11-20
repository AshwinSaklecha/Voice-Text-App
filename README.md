# Voice Conversion Web Application

A modern web application that allows users to upload voice files and convert text to speech using Azure's Text-to-Speech service. Built with React, Vite, Node.js, and Supabase storage.

## Features

- File upload with drag-and-drop support
- Text-to-speech conversion using Azure Speech Services
- Progress indicators and animations
- Modern UI with Tailwind CSS
- Secure file storage using Supabase
- Real-time voice file generation

## Prerequisites

Before running the application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project
- Azure Speech Services subscription

## Environment Variables

### Backend (.env)
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
AZURE_SPEECH_KEY=your_azure_speech_key
AZURE_SPEECH_REGION=your_azure_region
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```
The backend server will start running on http://localhost:5000

### 2. Frontend Setup
Open a new terminal window and:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend application will be available at http://localhost:5173

## Project Structure

```
project/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
└── backend/           # Node.js backend server
    ├── routes/
    ├── services/
    └── package.json
```

## Technologies Used

- Frontend:
  - React 18
  - Vite
  - Tailwind CSS
  - React Dropzone
  - Axios

- Backend:
  - Node.js
  - Express
  - Azure Cognitive Services
  - Supabase Storage
  - Multer

## API Endpoints

- `POST /api/upload` - Upload voice file
- `POST /api/generate` - Generate speech from text

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
```

The main changes I made to the README include:
1. Added clear sequential steps for running the application
2. Separated backend and frontend setup into distinct sections
3. Added specific terminal commands with comments
4. Included environment variable examples
5. Made the prerequisites more prominent
6. Added API endpoints section
7. Improved the overall structure and readability
