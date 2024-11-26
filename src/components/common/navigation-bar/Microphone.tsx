"use client";

import React, { useEffect, useState } from "react";
import { MdMic, MdMicOff } from "react-icons/md";
import { handleCommand as cohereHandleCommand } from "@/app/IA/cohere";

const colorDictionary = {
  azul: "blue",
  negro: "black",
  marrón: "brown",
  chocolate: "chocolate",
  dorado: "gold",
  gris: "gray",
  verde: "green",
  naranja: "orange",
  rosa: "pink",
  rojo: "red",
  salmón: "salmon",
  plata: "silver",
  nieve: "snow",
  arena: "tan",
  violeta: "violet",
  blanco: "white",
  amarillo: "yellow",
};

const navigationCommands = {
  "ir a login": "/login",
  "ir a registro": "/register",
  "ir a inicio": "/home",
  "ir a perfil": "/profile",
  "ir a playlist": "/my-playlists",
  "ir a buscar": "/search",
  "ir a editar perfil": "/profile/edit",
  "ir a historial": "/history",
};

const backgroundImages = {
  comida: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/comida.gif")',
  estrella:
    'url("https://escuchafacil.s3.us-east-2.amazonaws.com/estrella.gif")',
  chill: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/fondo1.webp")',
  anime: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/fondo2.webp")',
  futuro: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/futuro.gif")',
  gamer: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/gamer.gif")',
  halloween:
    'url("https://escuchafacil.s3.us-east-2.amazonaws.com/halloween.gif")',
  kirby: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/kirby.gif")',
  lago: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/lago.gif")',
  lluvia: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/lluvia.gif")',
  mario: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/mario.gif")',
  otaku: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/otaku.gif")',
  computadora: 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/pc.gif")',
};

type MicrophoneProps = {
  onNavigate: (route: string) => void;
  onColorChange: (color: string) => void;
  onBackgroundChange: (background: {
    backgroundImage: string;
    backgroundColor: string;
    backgroundSize: string;
    backgroundPosition: string;
  }) => void;
};

const Microphone = ({
  onNavigate,
  onColorChange,
  onBackgroundChange,
}: MicrophoneProps) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [hasSpoken, setHasSpoken] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.interimResults = true;

    const handleRecognitionResult = async (event: SpeechRecognitionEvent) => {
      if (!isSpeaking || !isMicOn) return;

      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Command:", command);

      const commandProcessed = await processCommand(command);
      if (!commandProcessed) {
        speak("Comando no reconocido, intenta nuevamente.");
      }
    };

    const processCommand = async (command: string) => {
      const isNavigationCommand = Object.keys(navigationCommands).find((cmd) =>
        command.includes(cmd)
      );

      if (isNavigationCommand) {
        const route =
          navigationCommands[
            isNavigationCommand as keyof typeof navigationCommands
          ];
        const pageName = isNavigationCommand.split(" ").slice(2).join(" ");
        onNavigate(route);
        speak(`Navegando a ${pageName}`);
        return true;
      }

      const isBackgroundCommand = Object.keys(backgroundImages).find((cmd) =>
        command.includes(cmd)
      );

      if (isBackgroundCommand) {
        const background =
          backgroundImages[
            isBackgroundCommand as keyof typeof backgroundImages
          ];
        onBackgroundChange({
          backgroundImage: background,
          backgroundColor: "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
        });
        speak(`Fondo cambiado a ${isBackgroundCommand}`);
        return true;
      }

      const isColorCommand = Object.keys(colorDictionary).find((cmd) =>
        command.includes(cmd)
      );

      if (isColorCommand) {
        const color =
          colorDictionary[isColorCommand as keyof typeof colorDictionary];
        onColorChange(color);
        speak(`Color cambiado a ${isColorCommand}`);
        return true;
      }

      const coherenceResponse = await cohereHandleCommand(command);
      if (coherenceResponse && !hasSpoken) {
        speak(coherenceResponse);
        setHasSpoken(true);
        return true;
      } else if (!hasSpoken) {
        speak("Comando no reconocido, intenta nuevamente.");
        return false;
      }

      return false;
    };

    const speak = (message: string) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setHasSpoken(false);
      };
      window.speechSynthesis.speak(utterance);
    };

    recognition.onresult = handleRecognitionResult;
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      restartRecognition();
    };

    const restartRecognition = () => {
      recognition.stop();
      setTimeout(() => recognition.start(), 1000);
    };

    if (isMicOn) {
      recognition.start();
    }

    return () => {
      recognition.stop();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    isSpeaking,
    isMicOn,
    timeoutId,
    hasSpoken,
    onNavigate,
    onColorChange,
    onBackgroundChange,
  ]);

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={toggleMic}>
      {isMicOn ? (
        <MdMic className="text-5xl text-green-500" />
      ) : (
        <MdMicOff className="text-5xl text-red-500" />
      )}
    </div>
  );
};

export default Microphone;
