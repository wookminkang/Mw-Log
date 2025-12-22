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
import supabase from "@/lib/supabase/client";
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

export function PostDetail({ id }: { id: string }) {
  const [title, setTitle] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);
  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [contentPreview, setContentPreview] = useState<string>("");

  // 썸네일 이미지 버튼
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* 썸네일 이미지 */
    setThumbnail(e.target.files[0]);
    //const ext = e.target.files[0].name.split(" ").pop().split(".").pop()
  };

  const getDetail = async () => {
    const data = await getPostDetail(id);
    console.log(`detail data =>`, data);
    setTitle(data.title);
    setIsView(data.isView);
    setCategory(data.category);
    setContent(JSON.parse(data.content));
    setThumbnail(data.thumbnail);
    setContentPreview(getContent(JSON.parse(data.content)));
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  const handleSubmit = async () => {
    /**
     * 수정 update
     */
    // const { data, error } = await supabase
    // .from('topic')
    // .update({ title, content: JSON.stringify(content), content_preview:contentPreview, category, thumbnail: thumbnailUrl, author: user?.id, status: "publish" })
    // .eq('id', topic_id)
    // .select()
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
