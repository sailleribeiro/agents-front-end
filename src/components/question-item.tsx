import { Bot, Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeDate } from "@/utils/format-relative-date";

interface Question {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  isGenerationgAnswer?: boolean;
}

interface QuestionItemProps {
  question: Question;
}

export function QuestionItem({ question }: QuestionItemProps) {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Question */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Pergunta</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {(!!question.answer || question.isGenerationgAnswer) && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-4 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-foreground">
                  Resposta da IA
                </p>
                <div className="text-muted-foreground">
                  {question.isGenerationgAnswer ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-primary text-sm italic">
                        Gerando resposta...
                      </span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {question.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {formatRelativeDate(question.createdAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
