import { useMicrophoneContext } from "@/context/MicrophoneContext";

export default function useMicrophone() {
  const { isListening, startListening, stopListening } = useMicrophoneContext();
  return { isListening, startListening, stopListening };
}
