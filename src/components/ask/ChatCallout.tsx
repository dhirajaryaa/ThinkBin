import ReactMarkdown from "react-markdown";

export const ChatCallout = ({ message }: { message: string }) => {
  return (
    <div className={`w-full`}>
      <p className="text-sm p-4 col-span-4 rounded-xl bg-muted relative shadow w-fit md:max-w-2/3 ml-auto">
        {message}
      </p>
    </div>
  );
};

export const AIChatCallout = ({ message }: { message: string }) => {
  return <ReactMarkdown >{message}</ReactMarkdown>;
};
