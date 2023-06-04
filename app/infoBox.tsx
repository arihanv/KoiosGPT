import React from "react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  data: Record<string, any>
}

export default function InfoBox({ data }: Props) {

  return (
    <>
      <div className="max-w-3xl rounded-xl border border-gray-700 bg-white p-1 drop-shadow-xl dark:bg-black">
        <div className="gap-2 rounded-lg border border-gray-700 bg-white p-2 dark:bg-black">
          <Tabs defaultValue="quick" className="h-[200px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick">Quick Info</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="authors">Authors</TabsTrigger>
            </TabsList>
            <TabsContent value="quick" className="h-[80%] overflow-y-scroll">
              <div className="flex flex-col gap-2 p-1">
                <div className="flex items-center justify-start gap-4">
                  <Badge className="overflow w-fit text-xs hover:bg-black dark:hover:bg-white">
                    Computer Science
                  </Badge>
                  <div className="flex flex-col text-xs tracking-tighter text-gray-500 ">
                    <div>
                      Pub Date:{" "}
                      {new Date(data.published).toISOString().split("T")[0]}
                    </div>
                  </div>
                  <div className="flex flex-col text-xs tracking-tighter text-gray-500 ">
                    <div>
                      Update:{" "}
                      {new Date(data.updated).toISOString().split("T")[0]}
                    </div>
                  </div>
                </div>
                <Separator />
                <h1
                  className="w-fit cursor-pointer font-extrabold tracking-tighter sm:text-xl"
                  onClick={() => window.open(data.pdf_url, "_blank")}
                >
                  {data.title}
                </h1>
                <Separator />
                <div className="flex flex-wrap gap-1">
                  {(Object.values(data.authors) as { name: string }[]).map(
                    (author: { name: string }, index: number) => (
                      <Badge
                        key={index}
                        onClick={() =>
                          window.open(
                            `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q=${author.name
                              .toLowerCase()
                              .replace(/\s+/g, "%20")}`,
                            "_blank"
                          )
                        }
                        variant="outline"
                        className="cursor-pointer text-sm tracking-tighter text-gray-500"
                      >
                        {author.name}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="summary" className="h-[80%] overflow-y-scroll">
              <div className="flex flex-col gap-2 p-2 text-sm">
                {data.summary}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
