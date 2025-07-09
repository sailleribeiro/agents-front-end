import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// Esquema de validação no mesmo arquivo conforme solicitado
const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "Pergunta é obrigatória")
    .min(10, "Pergunta deve ter pelo menos 10 caracteres")
    .max(500, "Pergunta deve ter menos de 500 caracteres"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  function handleCreateQuestion(data: CreateQuestionFormData) {
    console.log(data, roomId);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Pergunta</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      placeholder="O que você gostaria de saber?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Enviar pergunta</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
