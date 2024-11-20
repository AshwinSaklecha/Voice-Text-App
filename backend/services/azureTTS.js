const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateSpeech(text, outputFileName) {
  return new Promise((resolve, reject) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_SPEECH_REGION
    );
    
    // Configure speech synthesis with specific audio format
    speechConfig.speechSynthesisOutputFormat = 
      sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    
    const filePath = path.join(__dirname, 'output', outputFileName);
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filePath);
    
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      result => {
        synthesizer.close();
        if (result) {
          resolve(filePath);
        } else {
          reject(new Error('Speech synthesis failed'));
        }
      },
      error => {
        synthesizer.close();
        reject(error);
      }
    );
  });
}

module.exports = { generateSpeech }; 
