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

function UserInput() {
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

  return (
    <form action={askQuestionAction}>
      <section className="flex items-center gap-4 sticky bottom-0 rounded-xl px-2 py-1 bg-muted shadow  ">
        <input
          {...register("query")}
          placeholder="Ask a question"
          className="w-full h-ful p-2 outline-0"
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
