import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Mic, MicOff, Radio } from "lucide-react";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  !!navigator.mediaDevices.getUserMedia &&
  !!window.MediaRecorder;

interface RecordRoomAudioModalProps {
  roomId: string;
}

export function RecordRoomAudioModal({ roomId }: RecordRoomAudioModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const recordRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  async function stopRecording() {
    if (recordRef.current && recordRef.current.state === "recording") {
      recordRef.current.stop();
    }

    toast("Recording has been paused", {
      icon: "✅",
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();
    formData.append("audio", audio, "audio.webm");

    const response = await fetch(`http://localhost:3333/room/${roomId}/audio`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Audio uploaded:", result);
  }

  function createRecorder(audio: MediaStream) {
    recordRef.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 128000,
    });

    recordRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
      setIsRecording(false);
    };

    recordRef.current.onstart = () => {
      console.log("Recording started");
    };

    recordRef.current.onstop = () => {
      console.log("Recording stopped");
    };

    recordRef.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      toast("Recording is not supported in this browser.", {
        icon: "🚫",
      });
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    createRecorder(audio);

    toast("Recording started. Speak now!", {
      icon: "🎤",
    });
  }

  function handleClose() {
    if (isRecording) {
      stopRecording();
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="secondary">
          <Radio className="size-4" />
          Gravar Áudio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gravar Áudio da Sala</DialogTitle>
          <DialogDescription>
            Grave áudio para esta sala. Sua gravação será processada
            automaticamente.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          {isRecording ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-pulse">
                <MicOff className="size-16 text-red-500" />
              </div>
              <p className="text-sm text-muted-foreground">Gravando...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Mic className="size-16 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Clique no botão abaixo para começar a gravar
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogClose>
          {isRecording ? (
            <Button variant="destructive" onClick={stopRecording}>
              Parar Gravação
            </Button>
          ) : (
            <Button onClick={startRecording}>Iniciar Gravação</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
