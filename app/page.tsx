import Link from "next/link"
import { ArrowBigUp, ArrowUp, ChevronUp, UploadCloud } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Animation } from "@/components/lottie/animation"
import { Search } from "lucide-react"

export default function IndexPage() {
  return (
    <section className="container flex flex-col items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col py-10">
        <div className="flex items-center justify-between gap-10">
          <div>
            <h1 className=" whitespace-nowrap text-8xl font-extrabold leading-tight tracking-tighter lg:text-[150px]">
              <span>
                Koios GPT <b className="text-5xl tracking-normal">.v1</b>
              </span>
            </h1>
            <h1 className="ml-2 text-xl font-semibold tracking-tight">
              Analyze research articles and your PDFs easily with AI
            </h1>
          </div>
          <div className="grayscale invert dark:invert-0">
            <Animation />
          </div>
        </div>
        <div className="ml-2 flex justify-between">
          <div className="flex flex-col">
            <div className="grid grid-cols-[2fr,4fr,1fr]">
              <Link href="/nav" className="w-full">
                <Button className="p-7 w-full text-xl" size={"lg"}>
                  Try Now
                </Button>
              </Link>
              <span className="m-5 flex-grow border-y "></span>
              <div className="flex justify-center items-center gap-5">
              <Link href={"/search"}>
              <Search size={45} className="inline-block" />
              </Link>
              <div className="border h-full"></div>
              <Link href={"/myfiles"}>
              <UploadCloud size={45} />
              </Link>
              </div>
            </div>
            <div className="mt-10 flex w-[60%] items-center gap-2 ">
              <ChevronUp size={200}></ChevronUp>
              <div className="rounded-xl">
                *Koios is free but requires an Open AI Key to work. Your API Key
                is never shared or stored on our servers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative grid grid-cols-1 grid-rows-1">
          <h1 className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto flex flex-col items-center justify-center gap-2 whitespace-nowrap text-[150px] font-extrabold leading-tight tracking-tighter">
            <div className="w-fit rounded-sm px-4 py-0.5 backdrop-blur-lg  ">
              Koios GPT
            </div>
          </h1>
          <div className="dark:invert min-h-[550px]">
            <Animation />
          </div>
        </div> */}
      {/* <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p> */}
      {/* <div className="flex items-center justify-between gap-2 w-full px-1">
          <div>
            Hello
          </div>
          <div>
            hello
          </div>
      </div> */}
    </section>
  )
}
