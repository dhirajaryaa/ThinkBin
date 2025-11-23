import { getNotes } from "@/actions/notes/getNotes";
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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

async function NoteList() {
  const notes = await getNotes();

  if (notes.error) {
    toast.error(notes.error);
  }
  return (
    <section className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {notes.data?.map((note) => (
        <Card
          key={note.id}
          className="gap-4 bg-muted shadow-sm duration-200 hover:-translate-y-1 border-b-4 border-b-foreground"
        >
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription className="space-y-2 space-x-2">
              {note.tags.map((tag) => (
                <Badge key={tag.id} variant={"outline"} className="text-xs">
                  #{tag.tag}
                </Badge>
              ))}
            </CardDescription>
            <CardAction>
              <Button size="sm" asChild>
                <Link href={"/notes/" + note.id + "/view"}>
                  <ExternalLink /> View
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="w-full line-clamp-4 text-sm text-foreground/50">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          </CardContent>
          <CardFooter className="text-xs">
            <strong className="mr-2">Last Updated: </strong>
            {new Date(note.updatedAt).toDateString()}
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}

export default NoteList;
