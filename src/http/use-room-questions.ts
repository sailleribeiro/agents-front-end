import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useRoomQuestions(rooomId: string) {
  return useQuery({
    queryKey: ["get-questions", rooomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/room/${rooomId}/questions`
      );
      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
  });
}
