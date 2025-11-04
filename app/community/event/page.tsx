import { List } from "./component"
import { PHOTO_TYPE } from "@/types/photo"

async function EventPage() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos`)
  const data: PHOTO_TYPE[] = await res.json()

  return (
    <>
      <List list={data} />
    </>
  )
}

export default EventPage
