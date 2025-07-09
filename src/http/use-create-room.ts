import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomRequest } from "./types/create-room-request";
import type { CreateRoomResponse } from "./types/create-room-response";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetch("http://localhost:3333/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const result: CreateRoomResponse = await response.json();

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-rooms"],
      });
    },
  });
}
