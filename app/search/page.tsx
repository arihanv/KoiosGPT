"use client"

import { useEffect, useState } from "react"
import Cookie from "js-cookie"
import { Search } from "lucide-react"

import { ApiFilter } from "@/components/apiFilter"

import PageContent from "./pageContent"

export default function IndexPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (!Cookie.get("key")) {
      window.location.href = "/auth"
    }
  }, [])

  return (
    <section className="m-auto grid max-w-[1200px] items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Search <Search size={35} className="inline-block" />
        </h1>
        <p className="text-center text-lg text-muted-foreground sm:text-xl">
          Search for articles here.
        </p>
      </div>

      {data.length != 0 ? (
        <PageContent data={data} setData={setData}></PageContent>
      ) : (
        <div className="flex h-[769px] items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900">
          <div className="flex flex-col gap-5 text-gray-400 dark:text-gray-600">
            <div className="flex justify-center">
              <div className="flex w-fit justify-center rounded-xl bg-gray-300 dark:bg-gray-800 px-3 py-0.5 text-sm font-medium text-gray-500 drop-shadow-md">
                Search For A Paper To Get Started
              </div>
            </div>
            {/* <div className="flex w-full flex-col items-center gap-2">
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
            </div> */}

            {/* <div className="m-auto w-[80%]">
              <hr />
            </div> */}

            <div>
              <div className="m-auto h-full w-fit rounded-xl bg-white p-1 drop-shadow-xl dark:bg-black">
                <div className="flex rounded-xl border bg-white p-1 dark:bg-black">
                  <ApiFilter disabled={false} setData={setData}></ApiFilter>
                </div>
              </div>

              {/* {verify !== true ? (
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
                  <div className="m-auto h-full w-fit rounded-xl bg-white p-1 drop-shadow-xl hover:cursor-not-allowed dark:bg-black">
                    <div className="pointer-events-none flex rounded-xl border bg-white p-1 dark:bg-black">
                      <ApiFilter disabled={true} setData={setData}></ApiFilter>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => send(key)}
                  className="flex flex-col items-center gap-2 text-sm font-semibold"
                >
                  <p>Verified Key ✅</p>
                  <div className="m-auto h-full w-fit rounded-xl bg-white p-1 drop-shadow-xl dark:bg-black">
                    <div className=" flex rounded-xl border bg-white p-1 dark:bg-black">
                      <ApiFilter disabled={false} setData={setData}></ApiFilter>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
            <div className="text-xs text-center">
              *Currently Koios GPT only has support for Arvix papers, but more are
              soon to come!
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
