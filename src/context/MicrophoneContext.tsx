"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { handleCommand as cohereHandleCommand } from "@/app/IA/cohere";

const MicrophoneContext = createContext({
  isListening: false,
  startListening: () => {},
  stopListening: () => {},
});

export const useMicrophoneContext = () => useContext(MicrophoneContext);

type MicrophoneProviderProps = {
  children: React.ReactNode;
};

interface SpeechRecognitionResult {
  isFinal: boolean;
  [key: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  [key: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

export const MicrophoneProvider = ({ children }: MicrophoneProviderProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "es-ES";

      recognitionInstance.onresult = async (event: SpeechRecognitionEvent) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log(`Comando detectado: ${command}`);

        const response = await cohereHandleCommand(command);
        if (response) {
          speak(response);
        }
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Error en el reconocimiento de voz:", event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speak = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <MicrophoneContext.Provider
      value={{ isListening, startListening, stopListening }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};
