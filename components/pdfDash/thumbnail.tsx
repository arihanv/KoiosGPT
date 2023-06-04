import React, { useEffect, useState } from "react"
import Link from "next/link"
import { pdfDb, pdfStore } from "@/api/det"
import { Loader2, Trash2 } from "lucide-react"

const Thumbnail = (props: any) => {
  const [imageURL, setImageURL] = useState<any>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        console.log(props)
        const image = await pdfStore.get(props.thumb_path)

        setImageURL(URL.createObjectURL(image as Blob))
      } catch (error) {
        console.error("Error fetching image:", error)
        setImageURL("")
      }
    }

    fetchImage()
  }, [])

  async function handleDelete() {
    setLoading(true)
    console.log(props.path.split("/")[1].split(".")[0])
    const docNum = props.path.split("/")[1].split(".")[0]
    const key = props.path.split("/")[0]
    const res = await pdfDb.get(props.path.split("/")[0])
    if (res !== null) {
      // Check if the file exists before attempting to delete
      if (props.path) {
        await pdfStore.delete(props.path)
      }

      if (props.thumb_path) {
        await pdfStore.delete(props.thumb_path)
        const embeddedThumbPath = props.thumb_path.replace(/_.*/, "_embedding")
        if (embeddedThumbPath) {
          await pdfStore.delete(embeddedThumbPath)
        }
      }

      await pdfDb.update(
        { [docNum]: pdfDb.util.trim(), numDocs: res.numDocs as number - 1 },
        key
      )
    }
    window.location.reload()
  }

  return (
    <>
      <div className="relative flex max-w-[232.78px] flex-col rounded-lg border border-gray-600">
        <button
          onClick={handleDelete}
          className="absolute right-0 m-1 rounded-xl bg-gray-200 p-2 text-red-600"
        >
          <Trash2 size={20} />
        </button>
        <Link href={`/myfiles/${props.path}`}>
          <div className="rounded-lg">
            {" "}
            {!loading ? (
              <>
                <img
                  className="m-auto h-[300px] rounded-lg rounded-b-none"
                  src={imageURL}
                  alt="Deta Drive Image"
                />{" "}
              </>
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-lg rounded-b-none">
                <div className="animate-spin text-gray-400 repeat-infinite dark:text-gray-600">
                  <Loader2 size={30} />
                </div>
              </div>
            )}
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap rounded-b-lg border-t border-t-gray-800 bg-white p-1 font-medium dark:bg-gray-600">
            {props.name}
          </div>
        </Link>
      </div>
    </>
  )
}

export default Thumbnail
