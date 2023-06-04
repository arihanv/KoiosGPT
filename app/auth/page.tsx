"use client"

import { useEffect, useState } from "react"
import Cookie from "js-cookie"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { ArrowUp, Bot, Info, Loader2 } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ApiFilter } from "@/components/apiFilter"
import Footer from "@/components/footer"

export default function IndexPage() {
  const [data, setData] = useState<any[]>([])
  const [key, setKey] = useState<string>(Cookie.get("key") || "")
  const [verify, setVerify] = useState<boolean>(false)
  const [submit, setSubmit] = useState<boolean>(false)

  useEffect(() => {
    if (key == Cookie.get("key")) {
      setVerify(true)
      return
    }
  }, [])

  const send = async (key: string) => {
    setSubmit(true)
    if (key == "" || key == Cookie.get("key")) return
    const embeddings = new OpenAIEmbeddings({ openAIApiKey: key })
    try {
      const res = await embeddings.embedQuery("t")
      if (res != null) {
        setVerify(true)
        Cookie.set("key", key)
        console.log("Valid key")
        window.history.back()
      } else {
        setVerify(false)
        console.log("Invalid key")
      }
    } catch (error) {
      setVerify(false)
      console.log("Invalid key")
    }
  }

  const handleScroll = () => {
    window.scrollBy({
      top: 275,
      behavior: "smooth",
    })
  }
  return (
    <section className="m-auto grid max-w-[1200px] items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex h-[769px] items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900">
          <div className="flex flex-col gap-5 text-gray-400 dark:text-gray-600">
            <div className="flex w-full flex-col items-center gap-2">
              <div className="flex items-center gap-1">
                <Info size={15} />
                <p className="text-sm font-semibold">
                  Your Key Is Only Stored In Your Browser
                </p>
              </div>
              <div className="h-full w-full max-w-3xl rounded-xl border border-gray-700 bg-white p-1 drop-shadow-xl dark:bg-black">
                <div className="flex rounded-lg border border-gray-700 bg-white dark:bg-black">
                  <Input
                    className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="password"
                    placeholder="Enter Valid Open AI API key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send(key)}
                  />
                  <Button className="flex gap-3 rounded-l-none" type="submit">
                    <Bot onClick={() => send(key)}></Bot>
                  </Button>
                </div>
              </div>
            </div>

            <div className="m-auto w-[80%]">
              <hr />
            </div>

            <div>
              {verify !== true ? (
                <div className="flex flex-col items-center gap-2 text-sm font-semibold">
                  <div className="mb-1 flex flex-col items-center gap-0.5">
                    <ArrowUp size={15} />
                    {
                      submit === true && verify === false ? (
                        <p>Invalid Key ❌</p>
                      ) : (
                        <p>Enter Valid Key</p>
                      )
                    }
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => send(key)}
                  className="flex flex-col items-center gap-2 text-sm font-semibold"
                >
                  <p>Verified Key ✅</p>
                </div>
              )}
            </div>
          </div>
        </div>
    </section>
  )
}
