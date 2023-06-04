// @ts-nocheck
"use client"

import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import axios from "axios"
import { Document, Page, pdfjs } from "react-pdf"

import "../styles/pdf.css"
import { useAtom } from "jotai"
import { ChevronLeft, ChevronRight, Loader2, ServerCrash } from "lucide-react"

import { pageNumberAtom } from "@/components/shared/sharedState"

import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { Input } from "@/components/ui/input"

const DispPDF = (props) => {
  const [pdfUrl, setPdfUrl] = useState(null)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [input, setInput] = useState<string>(0)
  const [failed, setFailed] = useState(false)
  const pdfContRef = useRef(null)
  const [pageNum] = useAtom(pageNumberAtom)

  useEffect(() => {
    setIsLoading(true)
    setFailed(false)
    const fetchPDF = async () => {
      try {
        let response = null
        if (props.type == "download") {
          response = await pdfStore.get(`${props.id}/${props.num}`)
        } else {
          response = await axios.get(
            `$[private_url]?url=` + props.url,
            {
              responseType: "arraybuffer",
            }
          )
          response = response.data
        }
        const pdfData = new Blob([response], { type: "application/pdf" })
        const pdfUrl = URL.createObjectURL(pdfData)
        setPdfUrl(pdfUrl)
      } catch (error) {
        console.error("Error:", error)
        setPdfUrl(null)
        setFailed(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPDF()
  }, [props.url])

  useEffect(() => {
    setPageNumber(pageNum)
    setInput(pageNum.toString())
  }, [pageNum])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1) // Reset the page number when a new document is loaded
    setInput("1")
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
      setInput((prevInput) => (parseInt(prevInput) - 1).toString())
    }
  }

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
      setInput((prevInput) => (parseInt(prevInput) + 1).toString())
    }
  }

  const handleSkip = (input: string) => {
    if (input === "") {
      setInput(pageNumber.toString())
    } else if (parseInt(input) > numPages) {
      setInput(numPages.toString())
      setPageNumber(numPages)
    } else if (parseInt(input) < 1) {
      setInput("1")
      setPageNumber(1)
    } else {
      setPageNumber(parseInt(input))
    }
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (pdfContRef.current && document.activeElement === pdfContRef.current) {
        if (e.key === "ArrowRight") {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
        if (e.key === "ArrowLeft") {
          handlePreviousPage()
        }
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [pageNumber])

  if (isLoading) {
    return (
      <div
        id="pdfCont"
        ref={pdfContRef}
        className="h-[900px] w-[695px] bg-gray-100 dark:bg-gray-900"
      >
        <div className="flex h-[900px] w-[695px] items-center justify-center gap-2 bg-gray-100 font-medium text-gray-400 dark:bg-gray-900 dark:text-gray-500">
          {" "}
          <div className="animate-spin text-gray-400 repeat-infinite dark:text-gray-600">
            <Loader2 size={30} />
          </div>
          Fetching PDF...
        </div>
      </div>
    )
  }

  if (failed) {
    return (
      <div
        id="pdfCont"
        ref={pdfContRef}
        className="h-[900px] w-[695px] bg-gray-100 dark:bg-gray-900"
      >
        <div className="flex h-[900px] w-[695px] items-center justify-center gap-2 bg-gray-100 font-medium text-gray-400 dark:bg-gray-900 dark:text-gray-500">
          <div className="flex max-w-[300px] flex-col items-center gap-2 text-center">
            <ServerCrash size={30} />
            <div className="font-semibold">Failed to load PDF</div>
            <p className="text-sm">
              PDF retrieval error: Server timeout (exceeded 20-second limit)
            </p>
            <p className="text-sm">Maybe try again later?</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      id="pdfCont"
      ref={pdfContRef}
      className="h-[900px] w-[695px] bg-gray-100 dark:bg-gray-900"
    >
      <div className="pdfContainer rounded-lg">
        <Document
          className="dark:invert"
          style={{ textAlign: "center" }}
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} height={900} width={695} />
        </Document>
        <div className="absolute mt-1 flex justify-center rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-800">
          <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
            <ChevronLeft className={pageNumber === 1 ? "text-gray-300" : ""} />
          </button>
          <span className="mx-2 flex items-center">
            Page{" "}
            <Input
              className="ml-2 mr-0.5 h-7 w-11 focus-visible:ring-0"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSkip(input)}
            />{" "}
            / {numPages}
          </span>
          <button onClick={handleNextPage} disabled={pageNumber === numPages}>
            <ChevronRight
              className={pageNumber === numPages ? "text-gray-300" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(DispPDF), {
  ssr: false,
})
