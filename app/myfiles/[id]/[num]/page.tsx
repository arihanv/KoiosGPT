import React from 'react'
import DispPDF from '@/app/DispPDF'
import Chat from '@/components/chat/page'

export default function viewer({params}: {params: {
  id: string,
  num: string
}}) {
  return (
    <section className="m-auto grid max-w-[1200px] items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="grid grid-cols-[1.25fr,1fr] items-center justify-center gap-8">
            <div className="flex h-full w-full flex-col gap-3">
              <div className="h-full w-full max-w-3xl rounded-xl border border-gray-700 bg-white p-1 drop-shadow-xl dark:bg-black">
                <div className="h-full max-w-fit gap-2 rounded-lg border border-gray-700 bg-white dark:bg-black">
                  {/*@ts-ignore*/}
                  <DispPDF url={undefined} type={"download"} id={params.id} num={params.num} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-xl bg-gray-100 p-3 dark:bg-gray-900">
                <Chat path={`${params.id}/${params.num}`} data={
                  { title: "this pdf" }
                }  ></Chat>
            </div>
          </div>
    </section>
  )
}