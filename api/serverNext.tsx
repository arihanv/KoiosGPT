import Cookie from "js-cookie"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import {
  MemoryVectorStore,
} from "langchain/vectorstores/memory"
import drive from "./det"

async function getData(query: string) {
  const url = `[private_api]?url=${encodeURIComponent(
    query
  )}`

  const res = await fetch(url)

  if (!res.ok) {
    console.error(await res.json())
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

async function checkExist(id: string) {
  try {
    const file = await drive.get(id)
    if (file === null) return null
    const content = await file.text()
    const jsonData = JSON.parse(content)
    return jsonData
  } catch (error: any) {
    if (error.status === 404) {
      console.log("File does not exist:", id)
    } else {
      console.error("Error retrieving file:", error)
    }
  }
}


const run = async (url: string) => {
  const parts = url.split("/")
  const loadDrive = await checkExist(parts[parts.length - 1])

  if (loadDrive !== null) {
    console.log("Already exists")
    const loadStore = await MemoryVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: Cookie.get("key"),
      })
    )
    loadStore.memoryVectors = loadDrive
    return loadStore
  }
}

export {run}
