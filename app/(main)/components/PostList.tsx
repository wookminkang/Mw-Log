import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import dayjs from "dayjs";

async function PostList() {
  const supabase = await createClient();
  let query = supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("isView", true);

  const { data: list, error } = await query;

  console.log(`main List =>`, list);

  return (
    <>
      {list?.map((item) => (
        <Card
          key={item?.id}
          className="w-full h-fit p-4 gap-4 cursor-pointer hover:bg-muted/95 transition-all duration-200"
        >
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="flex-1 flex flex-col gap-3 w-full md:w-auto">
              {/* 썸네일과 제목 */}
              <h3 className="text-xl font-bold tracking-tight line-clamp-2">
                {item?.title}
              </h3>
              {/* 본문 */}
              <p className="line-clamp-3 text-base text-muted-foreground ">
                {item?.content || ""}
              </p>
              <p className="text-md text-muted-foreground">
                {dayjs(item?.created_at).format("YYYY. MM. DD.")}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            {item?.thumbnail ? (
              <Image
                src={item?.thumbnail}
                alt="@THUMBNAIL"
                width={240}
                height={140}
                className="w-full md:w-[240px] h-auto md:h-[150px] aspect-video md:aspect-auto rounded-lg object-cover cursor-pointer"
              />
            ) : (
              <div className="w-full md:w-[200px] h-auto md:h-[150px] aspect-video md:aspect-auto rounded-lg object-cover bg-muted cursor-pointer"></div>
            )}
          </div>
        </Card>
      ))}
    </>
  );
}

export { PostList };
