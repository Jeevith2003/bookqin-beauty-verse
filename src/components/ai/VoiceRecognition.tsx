import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';

// Extend the global Window interface
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceRecognitionProps {
  onTranscript: (text: string) => void;
  isListening?: boolean;
  onListeningChange?: (listening: boolean) => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({
  onTranscript,
  isListening = false,
  onListeningChange
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        onListeningChange?.(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        onListeningChange?.(false);
      };
      
      recognitionInstance.onend = () => {
        onListeningChange?.(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      setIsSupported(false);
    }
  }, [onTranscript, onListeningChange]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
      onListeningChange?.(true);
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      onListeningChange?.(false);
    }
  };

  if (!isSupported) {
    return null; // Hide if not supported
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={isListening ? stopListening : startListening}
      className={`${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'} hover:text-bookqin-secondary`}
      disabled={!isSupported}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </Button>
  );
};

export default VoiceRecognition;