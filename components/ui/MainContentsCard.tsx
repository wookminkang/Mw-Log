import { Card, CardHeader, CardTitle } from "@/components/ui/card"

async function MainContentsCard() {
  return (
    <div>
      <Card className="w-full h-fit p-4 gap-4 cursor-pointer hover:bg-muted/15 transition-all duration-300">
        <CardHeader>
          <CardTitle>
            <h1></h1>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

export { MainContentsCard }
