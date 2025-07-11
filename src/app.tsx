import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();
export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<CreateRoom />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/room/:id/audio" element={<RecordRoomAudio />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}
