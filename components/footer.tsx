import React from "react"

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-4 border-t-[1px] p-5 text-sm text-gray-400 dark:border-gray-800 dark:text-gray-600">
      <div className="text-center">
        Made By{" "}
        <a
          href="https://www.linkedin.com/in/arihanvaranasi/"
          className="underline"
        >
          Arihan Varanasi
        </a>
      </div>
      {/* <div className="w-full text-start text-xs">
        Thank you to arXiv for use of its open access interoperability.
      </div> */}
    </div>
  )
}
