"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ImageUp, ArrowLeft, X } from "lucide-react";
import { useState, Suspense } from "react";
import { nanoid } from "nanoid";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Block } from "@blocknote/core";
import { getContent } from "@/utils/getContent";
import { Editor } from "@/components/common/DynamicEditor";
import Image from "next/image";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQueryKey, adminPostQueryKey } from "@/utils/QueryKeyFactory";
import { useRouter } from "next/navigation";
import { revalidatePostList } from "@/features/admin/api/serverActions";
import { useAuthStore } from "@/stores";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function PostCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const [title, setTitle] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setPreviewUrl("");
  };

  const createPost = async () => {
    // 1. 본문 content 깊은 복사
    const finalContent: Block[] = JSON.parse(JSON.stringify(content));

    // 2. 본문 이미지 blob → Supabase Storage 업로드 후 URL 교체
    await Promise.all(
      finalContent.map(async (item: any) => {
        if (item.type !== "image") return;
        const src: string | undefined = item.props.url;
        if (!src || !src.startsWith("blob:")) return;

        try {
          const res = await fetch(src);
          const blob = await res.blob();

          const fileExtFromName = item.props.name?.split(".").pop();
          const fileExtFromMime = blob.type?.split("/")[1];
          const fileExt = (fileExtFromName || fileExtFromMime || "bin").toLowerCase();
          const filePath = `topic/${nanoid()}.${fileExt}`;

          const { error: uploadError } = await createClient()
            .storage.from("files")
            .upload(filePath, blob, { contentType: blob.type, upsert: false });

          if (uploadError) throw uploadError;

          const { data: pub } = createClient()
            .storage.from("files")
            .getPublicUrl(filePath);

          item.props.url = pub.publicUrl;
        } catch {
          toast.error("일부 이미지 저장 실패");
        }
      })
    );

    // 3. 썸네일 파일 → Supabase Storage 업로드
    let thumbnailUrl: string | null = null;
    if (thumbnail) {
      const fileExt = thumbnail.name.split(".").pop();
      const filePath = `topics/${nanoid()}.${fileExt}`;

      const { error: uploadError } = await createClient()
        .storage.from("files")
        .upload(filePath, thumbnail);

      if (uploadError) throw uploadError;

      const { data: pub } = createClient()
        .storage.from("files")
        .getPublicUrl(filePath);

      thumbnailUrl = pub.publicUrl;
    }

    // 4. DB insert
    const { error } = await createClient()
      .from("topic")
      .insert({
        title,
        category,
        author: user?.id,
        thumbnail: thumbnailUrl,
        content: JSON.stringify(finalContent),
        isView,
        content_preview: getContent(content),
        status: isView ? "publish" : "draft",
      });

    if (error) throw error;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postQueryKey.lists() });
      await queryClient.invalidateQueries({ queryKey: adminPostQueryKey.lists() });
      await revalidatePostList();
      toast.success("등록되었습니다.");
      router.push("/admin/post");
    },
    onError: () => {
      toast.error("게시물 등록 실패.");
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!category) {
      toast.error("카테고리를 선택해주세요.");
      return;
    }
    mutate();
  };

  return (
    <section>
      <article className="flex flex-col gap-6">

        {/* 헤더 */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
              <Link href="/admin/post">
                <ArrowLeft className="w-4 h-4" />
                목록으로
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">새 포스트 작성</h1>
            <p className="text-muted-foreground text-sm">내용을 작성한 후 저장해주세요.</p>
          </div>
          <Button onClick={handleSubmit} disabled={isPending} size="lg" className="mt-7">
            {isPending ? "저장 중..." : "저장하기"}
          </Button>
        </div>

        <Separator />

        {/* 2컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* 왼쪽: 제목 + 에디터 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Card>
              <CardContent className="pt-6 flex flex-col gap-5">
                {/* 제목 */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="포스트 제목을 입력하세요."
                    className="text-base h-11"
                  />
                </div>

                <Separator />

                {/* 에디터 */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">내용</label>
                  <div className="rounded-md border overflow-hidden min-h-[400px]">
                    <Suspense
                      fallback={
                        <div className="h-[400px] bg-muted animate-pulse rounded-md" />
                      }
                    >
                      <Editor content={content} setContent={setContent} />
                    </Suspense>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 설정 사이드바 */}
          <div className="flex flex-col gap-4">

            {/* 발행 설정 */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  발행 설정
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">공개 여부</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isView ? "✓ 발행됨" : "— 비공개"}
                    </p>
                  </div>
                  <Checkbox
                    checked={isView}
                    onCheckedChange={() => setIsView((prev) => !prev)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 카테고리 */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  카테고리 <span className="text-red-500">*</span>
                </p>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="archive">archive</SelectItem>
                      <SelectItem value="uiux">uiux</SelectItem>
                      <SelectItem value="project">project</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* 썸네일 */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  썸네일
                </p>
                {previewUrl ? (
                  <div className="relative">
                    <Image
                      src={previewUrl}
                      alt="thumbnail preview"
                      width={400}
                      height={225}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 w-7 h-7"
                      onClick={removeThumbnail}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="thumbnail"
                    className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 hover:bg-muted/40 transition-all cursor-pointer"
                  >
                    <ImageUp className="text-muted-foreground mb-2" size={26} />
                    <span className="text-sm text-muted-foreground">클릭하여 이미지 선택</span>
                    <span className="text-xs text-muted-foreground/50 mt-1">PNG · JPG · WebP</span>
                  </label>
                )}
                <Input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </CardContent>
            </Card>

          </div>
        </div>
      </article>
    </section>
  );
}
