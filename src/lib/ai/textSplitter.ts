import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

export const textSplitter = async (
    content: string,
    { chunkOverlap, chunkSize }: { chunkOverlap: number; chunkSize: number }
) => {
    const splitter = new RecursiveCharacterTextSplitter(
        { chunkSize, chunkOverlap }
    );
    return await splitter.splitText(content)
};
