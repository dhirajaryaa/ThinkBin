"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { askQuestionSchema } from "@/schema/ask.schema";
import { askQuestion } from "@/actions/ask/askQuestion";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { chatData } from "@/app/(protected)/ask/page";

interface Input {
  query: string;
}

function UserInput({
  setLlmAnswer,
}: {
  setLlmAnswer: React.Dispatch<React.SetStateAction<chatData[]>>;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Input>({
    resolver: zodResolver(askQuestionSchema),
  });

  const onSubmit = async (input: Input) => {
    setLoading(true);
    setLlmAnswer((prev) => [
      ...(prev || []),
      { role: "user", content: input.query },
    ]);
    reset();

    const res = await askQuestion(input.query);

    if (res.success) {
      setLlmAnswer((prev) => [
        ...(prev || []),
        { role: "assistant", content: res.data as string },
      ]);
      setLoading(false);
    } else {
      toast.error(res.error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mx-auto py-4 w-full bg-background z-20"
    >
      <section className="flex items-center gap-4 rounded-xl px-2 py-1 bg-muted shadow  ">
        <input
          {...register("query")}
          placeholder="Ask a question"
          className="w-full h-full p-2 outline-0"
          aria-invalid={errors.query ? "true" : "false"}
        />
        <Button variant="default" size={"sm"}>
          {loading ? (
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
