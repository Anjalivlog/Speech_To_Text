import React, { useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';

function App() {
  
  const [textCopy, setTextCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textCopy, {
    successDuration:1000
  });
  
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (
    <>
      <div className='container'>
        <h2>Speech to text Converter</h2>
        <br/>
        <p>
          React hook that converts speech from tw microphone to text and make it availabe to your
          React components
        </p>
        <div className='main-content' onClick={() => setTextCopy(transcript)}>
          {transcript}
        </div>
        <div className='btn-style'>
          <button onClick={setCopied}>
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
