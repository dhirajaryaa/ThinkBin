"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { askQuestionSchema } from "@/schema/ask.schema";
import { askQuestion } from "@/actions/ask/askQuestion";
import { useActionState } from "react";
import { toast } from "sonner";

interface Input {
  query: string;
}

function UserInput({
  llmAnswer,
  setLlmAnswer,
}: {
  llmAnswer: string;
  setLlmAnswer: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    register,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(askQuestionSchema),
  });

  const [state, askQuestionAction, isPending] = useActionState(askQuestion, {
    success: false,
    error: null,
  });

  if (state.error) {
    toast.error(state.error);
  }

  if (state.data) {
    setLlmAnswer(state.data);
  }

  return (
    <form
      action={askQuestionAction}
      className="flex flex-col gap-2 absolute  bottom-3 left-0 right-0 mx-auto py-4 w-full bg-background z-20"
    >
      <section className="flex items-center gap-4 rounded-xl px-2 py-1 bg-muted shadow  ">
        <input
          {...register("query")}
          placeholder="Ask a question"
          className="w-full h-full p-2 outline-0"
          aria-invalid={errors.query ? "true" : "false"}
        />
        <Button variant="default" size={"sm"}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin size-5" /> Sending...
            </>
          ) : (
            <>
              <Send className="size-5" /> Send
            </>
          )}
        </Button>
      </section>
      {errors.query && (
        <p className="text-destructive text-xs">{errors.query.message}</p>
      )}
    </form>
  );
}

export default UserInput;
