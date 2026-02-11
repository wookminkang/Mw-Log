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
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageUp } from "lucide-react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AppEditor } from "@/components/common/AppEditor";
import type { Block } from "@blocknote/core";
import { getContent } from "@/utils/getContent";
import { Editor } from "@/components/common/DynamicEditor";
import Image from "next/image";
import { toast } from "sonner";
import { getPostDetail } from "@/features/main/api/getPostDetail";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/stores";
import { postQueryKey, adminPostQueryKey } from "@/utils/QueryKeyFactory";
import { useRouter } from "next/navigation";
import { revalidatePostList } from "@/features/admin/api/serverActions";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function PostDetail() {
  const router = useRouter();
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data: detailData } = useQuery({
    queryKey: postQueryKey.detail(id as string | number),
    queryFn: () => getDetailInfo(),
  });

  const getDetailInfo = async () => {
    const data = await getPostDetail(id as string | number);
    return data;
  };

  const [title, setTitle] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);
  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [contentPreview, setContentPreview] = useState<string>("");

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (detailData) {
      setTitle(detailData.title);
      setIsView(detailData.isView);
      setCategory(detailData.category);

      try {
        const parsedContent =
          typeof detailData.content === "string"
            ? JSON.parse(detailData.content)
            : detailData.content;

        setContent(parsedContent);
        setThumbnail(detailData.thumbnail);
        setContentPreview(getContent(parsedContent));
      } catch (e) {
        console.error("Content 파싱 에러", e);
      }
    }
  }, [detailData]);

  // 썸네일 이미지 버튼
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* 썸네일 이미지 */
    setThumbnail(e.target.files[0]);
    //const ext = e.target.files[0].name.split(" ").pop().split(".").pop()
  };

  const { mutate } = useMutation({
    mutationFn: () => updatePost(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueryKey.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: adminPostQueryKey.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: postQueryKey.detail(id as string | number),
      });

      await revalidatePostList();
      await toast.success("수정되었습니다.");
      router.push("/admin/post");
    },
  });

  const updatePost = async () => {
    // 1. 원본 state를 건드리지 않기 위해 깊은 복사 (선택 사항이지만 추천)
    const finalContent = JSON.parse(JSON.stringify(content));

    // 2. 이미지 블록만 찾아서 업로드 수행
    // (filterContent 대신 전체 content를 순회하며 type이 image인 것만 처리하는 게 더 안전합니다)
    await Promise.all(
      finalContent.map(async (item: any) => {
        // 이미지가 아니면 패스
        if (item.type !== "image") return;

        const src: string | undefined = item.props.url;

        // URL이 없거나, 이미 서버 주소(http)인 경우 업로드 스킵
        if (!src || !src.startsWith("blob:")) return;

        try {
          // 2-1) 실제 파일 데이터(Blob)로 변환
          const res = await fetch(src);
          const blob = await res.blob();

          // 2-2) 확장자 결정
          const fileExtFromName = item.props.name?.split(".").pop();
          const fileExtFromMime = blob.type?.split("/")[1];
          const fileExt = (
            fileExtFromName ||
            fileExtFromMime ||
            "bin"
          ).toLowerCase();

          const fileName = `${nanoid()}.${fileExt}`;
          const filePath = `topic/${fileName}`; // 폴더명 정리

          // 2-3) Supabase Storage 업로드
          const { error: uploadError } = await createClient()
            .storage.from("files") // 버킷 이름 확인 ("files" -> "images"?)
            .upload(filePath, blob, {
              contentType: blob.type,
              upsert: false,
            });

          if (uploadError) throw uploadError;

          // 2-4) 공개 URL 생성
          const { data: pub } = createClient()
            .storage.from("files") // 버킷 이름 확인
            .getPublicUrl(filePath);

          const publicUrl = pub.publicUrl;

          // 🔥 [가장 중요한 부분] blob 주소를 실제 서버 주소로 교체!!
          item.props.url = publicUrl;

          console.log("이미지 주소 교체 완료:", publicUrl);
        } catch (error) {
          console.error("이미지 업로드 중 실패:", error);
          toast.error("일부 이미지 저장 실패");
        }
      })
    );

    // 3. 썸네일 처리 (기존 로직 유지)
    let finalThumbnailUrl = thumbnail as string;
    if (thumbnail instanceof File) {
      // ... (기존 썸네일 업로드 로직, 필요시 여기에 작성) ...
      // 썸네일 업로드는 위에서 만든 로직 활용 가능
    }

    /**
     * 4. DB 업데이트
     * 이제 finalContent에는 blob 주소가 아닌 진짜 주소가 들어있습니다.
     */
    const { data, error } = await createClient()
      .from("topic")
      .update({
        title,
        content: JSON.stringify(finalContent), // 👈 수정된 content 저장
        content_preview: contentPreview,
        category,
        thumbnail: finalThumbnailUrl,
        author: user?.id,
        status: isView ? "publish" : "draft",
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating post:", error);
      toast.error("게시물 수정 실패.");
      throw error;
    }
  };

  const handleSubmit = async () => {
    mutate();
  };

  return (
    <section>
      {/* 내용입력 */}
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
                <Field>
                  <FieldLabel className="font-semibold text-xl">
                    썸네일
                  </FieldLabel>
                  <Separator />
                  {thumbnail ? (
                    <>
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
                          onClick={() => {
                            setThumbnail("");
                          }}
                        >
                          삭제하기
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor="thumbnail"
                          className="border rounded-[.625rem] p-2 w-[200px] h-[200px] inline-flex items-center justify-center cursor-pointer"
                        >
                          <div className="flex items-center gap-1">
                            <ImageUp
                              className="text-muted-foreground"
                              size={20}
                            />
                            <span className="text-sm text-muted-foreground">
                              썸네일 선택
                            </span>
                          </div>
                        </label>
                      </div>

                      <Input
                        type="file"
                        id="thumbnail"
                        className="hidden"
                        onChange={handleFile}
                      />
                    </>
                  )}
                </Field>
                <Field>
                  <FieldLabel className="font-semibold text-xl">
                    카테고리
                  </FieldLabel>
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
                <Field>
                  <FieldLabel className="font-semibold text-xl">
                    제목
                  </FieldLabel>
                  <Separator />
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel className="font-semibold text-xl">
                    발행/미발행
                  </FieldLabel>
                  <Separator />
                  <div>
                    <Checkbox
                      checked={isView}
                      onCheckedChange={() => setIsView(!isView)}
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel className="font-semibold text-xl">
                    내용
                  </FieldLabel>
                  <Separator />
                  <div className="px-4">
                    <Editor content={content} setContent={setContent} />
                  </div>
                </Field>
              </FieldGroup>
            </FieldSet>

            <Button onClick={handleSubmit}>수정완료</Button>
          </CardContent>
        </Card>
      </article>
    </section>
  );
}
