import { QuestionItem } from "./question-item";
import { useRoomQuestions } from "@/http/use-room-questions";

export function QuestionList({ roomId }: { roomId: string }) {
  const { data } = useRoomQuestions(roomId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}
