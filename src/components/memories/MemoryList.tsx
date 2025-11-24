import { getMemories } from "@/actions/memories/getMemories";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

async function MemoryList() {
  const memories = await getMemories();

  if (memories.error) {
    toast.error(memories.error);
  }
  return (
    <section className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {memories.data?.map((memory) => (
        <Card
          key={memory.id}
          className="gap-4 bg-muted shadow-sm duration-200 hover:-translate-y-0.5 hover:shadow-lg border-b-6 border-b-foreground"
        >
          <CardHeader>
            <CardTitle className="leading-5">{memory.title}</CardTitle>
            <CardDescription className="space-y-1 space-x-1.5 w-full line-clamp-1">
              {memory.tags.map((tag) => (
                <Badge key={tag.id} variant={"outline"} className="text-xs">
                  #{tag.tag}
                </Badge>
              ))}
            </CardDescription>
            <CardAction>
              <Button size="sm" asChild>
                <Link href={"/memories/" + memory.id + "/view"}>
                  <ExternalLink /> View
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="w-full line-clamp-4 text-sm text-foreground/50">
              <ReactMarkdown>{memory.content}</ReactMarkdown>
            </div>
          </CardContent>
          <CardFooter className="text-xs">
            <strong className="mr-2">Last Updated: </strong>
            {new Date(memory.updatedAt).toDateString()}
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}

export default MemoryList;
