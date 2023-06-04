import Cookie from "js-cookie"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import {
  MemoryVectorStore,
} from "langchain/vectorstores/memory"


function cleanData(data: any) {
  const cleanedData = data.map((obj:any) => {
    const cleanedContent = obj.content.replace(/\n/g, "");
    const encodedContent = cleanedContent.replace(/[^\x00-\x7F]/g, "");
    return { content: encodedContent, embedding: obj.embedding, metadata: obj.metadata};
  });
  return cleanedData
}

const runDown = async (path: "string") => {
  const embed_path = path.replace(".pdf", "_embedding")
  console.log(embed_path)
  const loadDeta = await checkExist(embed_path)

  if (loadDeta !== null) {
    console.log("Already exists")
    const loadStore = await MemoryVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: Cookie.get("key"),
      })
    )
    loadStore.memoryVectors = loadDeta
    return loadStore
  }
}

export {runDown}