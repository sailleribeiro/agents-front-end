import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/room/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const result: CreateQuestionResponse = await response.json();

      return result;
    },

    onMutate: ({ question }) => {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        "get-questions",
        roomId,
      ]);

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGenerationgAnswer: true,
      };

      const questionsArray = questions ?? [];

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-questions", roomId],
        [newQuestion, ...questionsArray]
      );

      return {
        newQuestion,
        questions,
      };
    },

    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-questions", roomId],
        (questions) => {
          if (!questions) {
            return questions;
          }

          if (!context?.newQuestion) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.id,
                answer: data.answer,
                isGenerationgAnswer: false,
              };
            }

            return question;
          });
        }
      );
    },

    onError: (_error, _variables, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ["get-questions", roomId],
          context.questions
        );
      }
    },
  });
}
