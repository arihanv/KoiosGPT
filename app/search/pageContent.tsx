"use client"

import { Loader2 } from "lucide-react"
import { ApiFilter } from "@/components/apiFilter"
import DispPDF from "../DispPDF"
import Chat from "@/components/chat/page"
import InfoBox from "../infoBox"


export default function PageContent(data:any) {
    return (
      <>
        {Object.keys(data.data[0]).length != 0 ? (
          <div className="grid grid-cols-[1.25fr,1fr] items-center justify-center gap-8">
            <div className="flex h-full w-full flex-col gap-3">
              <div className="h-full w-full max-w-3xl rounded-xl border border-gray-700 bg-white p-1 drop-shadow-xl dark:bg-black">
                <div className="h-full max-w-fit gap-2 rounded-lg border border-gray-700 bg-white dark:bg-black">
                  {/*@ts-ignore*/}
                  <DispPDF url={data.data[0].pdf_url}></DispPDF>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-xl bg-gray-100 p-3 dark:bg-gray-900">
              <div className="m-auto h-full w-fit rounded-xl bg-white p-1 drop-shadow-xl dark:bg-black">
                <div className="flex rounded-xl border bg-white p-1 dark:bg-black">
                  <ApiFilter disabled={false} setData={data.setData}></ApiFilter>
                </div>
              </div>
              {Object.keys(data.data[0]).length > 0 && (
                <>
                  <InfoBox data={data.data[0]} />
                  <Chat data={data.data[0]}></Chat>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-[769px] items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin text-gray-400 repeat-infinite dark:text-gray-600">
              <Loader2 size={30} />
            </div>
          </div>
        )}
      </>
    )
  }