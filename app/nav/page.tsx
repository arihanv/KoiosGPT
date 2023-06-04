import {Search, UploadCloud } from "lucide-react"
import Link from "next/link"

export default function IndexPage() {
  return (
    <section className="m-auto grid max-w-[1200px] items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex h-[769px] items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900">
        <div className="flex w-[40%] flex-col gap-5 text-gray-600">
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-5">
              <h3 className="text-xl font-semibold tracking-tight">
                Search For Articles
              </h3>
              <Link href={"/search"} className="rounded-xl border border-gray-400 bg-white  p-1 drop-shadow-xl dark:border-gray-700 dark:bg-black">
                <div className="flex aspect-square items-center justify-center rounded-lg border bg-white p-10 font-bold dark:bg-black">
                  <Search size={60} />
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-5">
              <h3 className="text-xl font-semibold tracking-tight">
                Upload/View Your PDFs
              </h3>
              <Link href={"/myfiles"} className="rounded-xl border border-gray-400 bg-white  p-1 drop-shadow-xl dark:border-gray-700 dark:bg-black">
                <div className="flex aspect-square items-center justify-center rounded-lg border bg-white p-10 font-bold dark:bg-black">
                  <UploadCloud size={60} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
