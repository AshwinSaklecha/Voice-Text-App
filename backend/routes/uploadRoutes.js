const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { generateSpeech } = require('../services/azureTTS');
const fs = require('fs');

// Validate environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false }
  }
);

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router.post('/upload', upload.single('voiceFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('Uploading file:', req.file.originalname);
        console.log('File size:', req.file.size);

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
            .from('voice-files')
            .upload(`original/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw error;
        }

        res.json({ 
            success: true, 
            filePath: data.path 
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: 'Error uploading file',
            details: error.message 
        });
    }
});

router.post('/generate', async (req, res) => {
    try {
        const { text, originalVoicePath } = req.body;
        
        if (!text || !originalVoicePath) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        console.log('Generating speech for text:', text);
        
        // Generate the new voice file
        const outputFileName = `${Date.now()}-output.mp3`;
        const generatedFilePath = await generateSpeech(text, outputFileName);

        // Read the file as a buffer
        const fileBuffer = await fs.promises.readFile(generatedFilePath);
        
        // Upload to Supabase with correct content type
        const { data, error } = await supabase.storage
            .from('voice-files')
            .upload(`generated/${outputFileName}`, fileBuffer, {
                contentType: 'audio/mpeg',
                cacheControl: '3600'
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw error;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
            .from('voice-files')
            .getPublicUrl(`generated/${outputFileName}`);

        // Clean up the local file
        await fs.promises.unlink(generatedFilePath);

        res.json({ 
            success: true,
            downloadUrl: publicUrl
        });
    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ 
            error: 'Error generating voice file',
            details: error.message 
        });
    }
});

module.exports = router;
