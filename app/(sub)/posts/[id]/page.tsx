import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Editor } from "@/components/common/DynamicEditor";
import { TOPIC_CATEGORY } from "@/constans/ConstansCategory";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PostData {
  title: string;
  content: string;
  created_at: string;
  thumbnail?: string;
  status: string;
  isView: boolean;
  id: string;
  category?: string;
  author: string;
}

// SEO 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("id", id)
    .eq("isView", true)
    .single();

  if (error || !data) {
    return {
      title: "포스트를 찾을 수 없습니다",
      description: "요청하신 포스트를 찾을 수 없습니다.",
    };
  }

  const getCategoryLabel = (category: string | null | undefined) => {
    if (!category) return "post";
    const found = TOPIC_CATEGORY.find((cat) => cat.category === category);
    return found?.label || category;
  };

  const title = `${data.title} | ${getCategoryLabel(data.category)}`;
  const description = data.title;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const imageUrl = data.thumbnail || `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    keywords: [data.category || "", data.title, "블로그", "포스트"],
    authors: [{ name: "돌멩이" }],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: data.created_at,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      siteName: "Mw Log",
    },
    alternates: {
      canonical: `${siteUrl}/posts/${id}`,
    },
  };
}

async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("id", id)
    .eq("isView", true)
    .single();

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">포스트를 찾을 수 없습니다</h1>
          <p className="text-muted-foreground mb-6">
            요청하신 포스트가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const parsedContent = data.content ? JSON.parse(data.content) : null;

  const getCategoryLabel = (category: string | null | undefined) => {
    if (!category) return "post";
    const found = TOPIC_CATEGORY.find((cat) => cat.category === category);
    return found?.label.toLowerCase() || category.toLowerCase();
  };

  const categoryLabel = getCategoryLabel(data.category);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <header className="mb-10">
        {/* Category Tag */}
        <div className="mb-4">
          <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-foreground text-xs font-medium rounded-md">
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
          {data.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={data.created_at}>
            {dayjs(data.created_at).format("YYYY. MM. DD")}
          </time>
        </div>
      </header>

      {/* Thumbnail */}
      {data.thumbnail && (
        <div className="mb-10 rounded-lg overflow-hidden">
          {/* <Image
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-auto object-cover"
          /> */}
        </div>
      )}

      <Separator className="mb-10" />

      {/* Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {parsedContent && (
          <Editor content={parsedContent} readonly={true} />
        )}
      </article>

      {/* Footer Separator */}
      <Separator className="mt-16 mb-8" />

      {/* Navigation Footer */}
      <footer className="flex justify-between items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          ← 목록으로 돌아가기
        </Link>
        <div>© 2025 돌멩이</div>
      </footer>
    </div>
  );
}

export default PostDetailPage;
