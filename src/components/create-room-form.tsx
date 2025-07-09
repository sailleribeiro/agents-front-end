import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const CreateRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  description: z.string().optional(),
});

type CreateRoomFormData = z.infer<typeof CreateRoomSchema>;

export function CreateRoomForm() {
  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCreateRoom = async (data: CreateRoomFormData) => {
    console.log("Creating room with data:", data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new room</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da IA.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter room name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Room
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
