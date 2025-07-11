import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  !!navigator.mediaDevices.getUserMedia &&
  !!window.MediaRecorder;

type RoomParams = {
  id: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
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

    const response = await fetch(
      `http://localhost:3333/room/${params.id}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

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

    intervalRef.current = setInterval(() => {
      recordRef.current?.stop();
      createRecorder(audio);
    }, 5000);

    toast("Recording started. Speak now!", {
      icon: "🎤",
    });
  }

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>Record Room Audio</h1>
      {isRecording ? (
        <Button variant="destructive" onClick={stopRecording}>
          Stop Recording
        </Button>
      ) : (
        <Button onClick={startRecording}>Start Recording</Button>
      )}
      <p>
        {isRecording ? "Recording..." : "Click the button to start recording."}
      </p>
    </div>
  );
}
