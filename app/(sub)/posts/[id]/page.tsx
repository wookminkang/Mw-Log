// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft } from "lucide-react";
// import dayjs from "dayjs";
// import Link from "next/link";

// import type { POST_DETAIL_TYPE } from "@/types";

// import { createServer } from "@/utils/supabase/server";
// import { Editor } from "@/components/common/DynamicEditor";
// import { metaFactory } from "@/utils/metaFactory";
// import { PostDetailsBack } from "@/features/main/components/PostDetailsBack";
// import { useAuthStore } from "@/stores";
// import { PostEditButton } from "@/features/main/components/PostEditButton";


// // SEO 메타데이터 생성
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const metaInfo = await metaFactory('topic', id);
//   const { title, description, keywords, authors, applicationName, creator } = await metaInfo.getMeta();

//   return {
//     title,
//     description,
//     keywords,
//     authors,
//     applicationName,
//     creator,
//   }
// }


// async function PostDetailPage({params}: {params: POST_DETAIL_TYPE}) {
//   const { id } = await params;  
//   const supabase = await createServer();
//   const { data, error } = await supabase
//     .from("topic")
//     .select("*")
//     .eq("status", "publish")
//     .eq("id", id)
//     .eq("isView", true)
//     .single();

//   if (error || !data) {
//     return (
//       <div className="max-w-3xl mx-auto py-12 px-6">
//         <div className="text-center py-16">
//           <h1 className="text-2xl font-bold mb-4">포스트를 찾을 수 없습니다</h1>
//           <p className="text-muted-foreground mb-6">
//             요청하신 포스트가 존재하지 않거나 삭제되었습니다.
//           </p>
//           <Link href="/">
//             <Button variant="outline">홈으로 돌아가기</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const parsedContent = data.content ? JSON.parse(data.content) : null;

//   return (
//     <div className="max-w-3xl mx-auto">
//       {/* Back Button */}
//       <div className="mb-8">
//         <PostDetailsBack />

//         <PostEditButton />
        
//       </div>

//       {/* Header Section */}
//       <header className="mb-10">
//         {/* Category Tag */}
//         <div className="mb-4">
//           <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-foreground text-sm font-medium rounded-md">
//             {data.category}
//           </span>
//         </div>

//         {/* Title */}
//         <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
//           {data.title}
//         </h1>

//         {/* Meta Info */}
//         <div className="flex items-center gap-4 text-xl text-muted-foreground font-semibold">
//           <time dateTime={data.created_at}>
//             {dayjs(data.created_at).format("YYYY. MM. DD")}
//           </time>
//         </div>
//       </header>

//       <Separator className="mb-10" />

//       {/* Content Section */}
//       <article className="prose prose-lg dark:prose-invert max-w-none">
//         {parsedContent && (
//           <Editor content={parsedContent} readonly={true} />
//         )}
//       </article>

//       {/* Footer Separator */}
//       <Separator className="mt-16 mb-8" />

//       {/* Navigation Footer */}
//       <footer className="flex justify-between items-center text-sm text-muted-foreground">
//         <PostDetailsBack />
//       </footer>
//     </div>
//   );
// }

// export default PostDetailPage;



import { Detail } from "../components/Detail";

export default async function PostDetailPage() {
  return (
    <>
      <Detail />
    </>
  )
}