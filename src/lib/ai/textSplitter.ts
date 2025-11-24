import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

export const textSplitter = async (markdownText: string, { chunkOverlap = 50, chunkSize = 500 }) => {
    const mdSplitter = RecursiveCharacterTextSplitter.fromLanguage(
        "markdown", { chunkSize, chunkOverlap }
    );
    const mdDocs = mdSplitter.createDocuments([markdownText]);

    //return chunks
    console.log("chunks:", mdDocs);
    return mdDocs;
};