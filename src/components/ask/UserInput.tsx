import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";

function UserInput() {
  return (
    <form>
      <section className="flex items-center gap-4 sticky bottom-0 rounded-xl px-2 py-1 bg-muted shadow">
        <input
          placeholder="Ask a question"
          className="w-full h-ful p-2 outline-0 "
        />
        <Button variant="default" size={"sm"}>
          {false ? (
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
    </form>
  );
}

export default UserInput;
