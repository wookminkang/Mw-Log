"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageUp } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { nanoid } from "nanoid";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Block } from "@blocknote/core";
import { getContent } from "@/utils/getContent";
import { Editor } from "@/components/common/DynamicEditor";
import Image from "next/image";
import { toast } from "sonner";
import { getPostDetail } from "@/features/main/api/getPostDetail";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import { postQueryKey, adminPostQueryKey } from "@/utils/QueryKeyFactory";
import { revalidatePostList } from "@/features/admin/api/serverActions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function PostDetail() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const { data: detailData, isLoading } = useQuery({
    queryKey: postQueryKey.detail(id as string | number),
    queryFn: () => getPostDetail(id as string | number),
  });

  const [title, setTitle] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);
  const [thumbnail, setThumbnail] = useState<File | string>("");

  useEffect(() => {
    if (!detailData) return;

    setTitle(detailData.title);
    setIsView(detailData.isView);
    setCategory(detailData.category);
    setThumbnail(detailData.thumbnail ?? "");

    try {
      const parsedContent =
        typeof detailData.content === "string"
          ? JSON.parse(detailData.content)
          : detailData.content;
      setContent(parsedContent);
    } catch (e) {
      console.error("Content 파싱 에러", e);
    }
  }, [detailData]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setThumbnail(e.target.files[0]);
  };

  const updatePost = async () => {
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

    // 3. 썸네일 File → Supabase Storage 업로드
    let finalThumbnailUrl = thumbnail as string;
    if (thumbnail instanceof File) {
      const fileExt = thumbnail.name.split(".").pop();
      const filePath = `topics/${nanoid()}.${fileExt}`;

      const { error: uploadError } = await createClient()
        .storage.from("files")
        .upload(filePath, thumbnail);

      if (uploadError) throw uploadError;

      const { data: pub } = createClient()
        .storage.from("files")
        .getPublicUrl(filePath);

      finalThumbnailUrl = pub.publicUrl;
    }

    // 4. DB 업데이트
    const { error } = await createClient()
      .from("topic")
      .update({
        title,
        content: JSON.stringify(finalContent),
        content_preview: getContent(content),
        category,
        thumbnail: finalThumbnailUrl,
        author: user?.id,
        status: isView ? "publish" : "draft",
      })
      .eq("id", id)
      .select();

    if (error) throw error;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postQueryKey.lists() });
      await queryClient.invalidateQueries({ queryKey: adminPostQueryKey.lists() });
      await queryClient.invalidateQueries({
        queryKey: postQueryKey.detail(id as string | number),
      });
      await revalidatePostList();
      toast.success("수정되었습니다.");
      router.push("/admin/post");
    },
    onError: () => {
      toast.error("게시물 수정 실패.");
    },
  });

  if (isLoading) {
    return (
      <section className="flex flex-col gap-8">
        <div className="h-10 w-48 bg-muted rounded animate-pulse" />
        <div className="h-[600px] bg-muted rounded-lg animate-pulse" />
      </section>
    );
  }

  return (
    <section>
      <article className="flex flex-col gap-8">
        <div>
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
            Post 수정
          </h1>
        </div>
        <Card>
          <CardContent>
            <FieldSet>
              <FieldGroup>
                {/* 썸네일 */}
                <Field>
                  <FieldLabel className="font-semibold text-xl">썸네일</FieldLabel>
                  <Separator />
                  {thumbnail ? (
                    <div>
                      <Image
                        src={
                          typeof thumbnail === "string"
                            ? thumbnail
                            : URL.createObjectURL(thumbnail)
                        }
                        alt="thumbnail"
                        width={200}
                        height={200}
                        className="w-[200px] h-[200px] object-cover"
                      />
                      <Button
                        className="text-md w-[200px] border rounded-[.625rem] p-2 mt-2 cursor-pointer"
                        onClick={() => setThumbnail("")}
                      >
                        삭제하기
                      </Button>
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor="thumbnail"
                        className="border rounded-[.625rem] p-2 w-[200px] h-[200px] inline-flex items-center justify-center cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <ImageUp className="text-muted-foreground" size={20} />
                          <span className="text-sm text-muted-foreground">썸네일 선택</span>
                        </div>
                      </label>
                      <Input
                        type="file"
                        id="thumbnail"
                        className="hidden"
                        onChange={handleFile}
                      />
                    </>
                  )}
                </Field>

                {/* 카테고리 */}
                <Field>
                  <FieldLabel className="font-semibold text-xl">카테고리</FieldLabel>
                  <Separator />
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="archive">archive</SelectItem>
                        <SelectItem value="uiux">uiux</SelectItem>
                        <SelectItem value="project">project</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                {/* 제목 */}
                <Field>
                  <FieldLabel className="font-semibold text-xl">제목</FieldLabel>
                  <Separator />
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field>

                {/* 발행/미발행 */}
                <Field>
                  <FieldLabel className="font-semibold text-xl">발행/미발행</FieldLabel>
                  <Separator />
                  <Checkbox
                    checked={isView}
                    onCheckedChange={() => setIsView((prev) => !prev)}
                  />
                </Field>

                {/* 내용 */}
                <Field>
                  <FieldLabel className="font-semibold text-xl">내용</FieldLabel>
                  <Separator />
                  <div className="px-4">
                    <Suspense
                      fallback={
                        <div className="h-[400px] bg-muted rounded animate-pulse" />
                      }
                    >
                      <Editor content={content} setContent={setContent} />
                    </Suspense>
                  </div>
                </Field>
              </FieldGroup>
            </FieldSet>

            <Button onClick={() => mutate()} disabled={isPending}>
              {isPending ? "수정 중..." : "수정완료"}
            </Button>
          </CardContent>
        </Card>
      </article>
    </section>
  );
}
