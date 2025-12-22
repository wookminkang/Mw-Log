// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Field,
//   FieldSet,
//   FieldGroup,
//   FieldLabel,
//   FieldDescription,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { ImageUp } from "lucide-react";
// import { useState, useEffect } from "react";
// import { nanoid } from "nanoid";
// import { createClient } from "@/lib/supabase/client";
// import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/stores";
// import { Checkbox } from "@/components/ui/checkbox";
// import { AppEditor } from "@/components/common/AppEditor";
// import type { Block } from "@blocknote/core";
// import { getContent } from "@/utils/getContent";
// import { Editor } from "@/components/common/DynamicEditor";
// import Image from "next/image";

// function PostCreate() {
//   const user = useAuthStore((state) => state.user);
//   // console.log(`user =>`, user);

//   const [title, setTitle] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [thumbnail, setThumbnail] = useState<File | string>("");
//   const [isView, setIsView] = useState<boolean>(true);
//   const [content, setContent] = useState<Block[]>([]);
//   const [previewImg, setPreviewImg] = useState<string>("");

//   const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     console.log(`thumbnail`, e.target.files[0]);
//     console.log(`previewImg`, URL.createObjectURL(e.target.files[0]));
//     setPreviewImg(URL.createObjectURL(e.target.files[0]));
//     setThumbnail(e.target.files[0] || null);
//   };

//   const res_contentPreview = getContent(content);

//   const handleSubmit = async () => {
//     let stateThumbnail;
//     if (thumbnail && thumbnail instanceof File) {
//       const fileExt = thumbnail?.name.split(".").pop();
//       const fileName = `${nanoid()}.${fileExt}`;
//       const filePath = `posts/${fileName}`;

//       const { data: uploadData, error: uploadError } = await createClient.storage
//         .from("files")
//         .upload(filePath, thumbnail);

//       if (uploadError) {
//         console.error("썸네일 업로드 실패:", uploadError);
//         return;
//       }

//       const { data: thumbnailData } = await supabase.storage
//         .from("files")
//         .getPublicUrl(filePath);
//       stateThumbnail = thumbnailData.publicUrl;
//       setThumbnail(stateThumbnail);
//     }

//     const { data, error } = await supabase
//       .from("topic")
//       .insert({
//         title,
//         category,
//         author: user?.id,
//         thumbnail: stateThumbnail,
//         content,
//         isView,
//         content_preview: res_contentPreview,
//         status: "publish",
//       })
//       .select();
//   };

//   return (
//     <section>
//       {/* 내용입력 */}
//       <article className="flex flex-col gap-8">
//         <div>
//           <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
//             Post 작성
//           </h1>
//           <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base mt-2">
//             아래 내용을 작성해주세요.
//           </p>
//         </div>
//         <Card>
//           <CardContent>
//             <FieldSet>
//               <FieldGroup>
//                 <Field>
//                   제목:{title} <br />
//                   카테고리:{category} <br />
//                   발행/미발행: {isView ? "발행" : "미발행"} <br />
//                 </Field>
//                 <Field>
//                   <FieldLabel>썸네일</FieldLabel>
//                   {thumbnail && thumbnail instanceof File ? (
//                     <>
//                       <div>
//                         <Image
//                           src={previewImg}
//                           alt="thumbnail"
//                           width={200}
//                           height={200}
//                           className="w-[200px] h-[200px] object-cover"
//                         />
//                         <Button
//                           className="text-md w-[200px] border rounded-[.625rem] p-2 mt-2 cursor-pointer"
//                           onClick={() => {
//                             setThumbnail("");
//                             setPreviewImg("");
//                           }}
//                         >
//                           삭제하기
//                         </Button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div>
//                         <label
//                           htmlFor="thumbnail"
//                           className="border rounded-[.625rem] p-2 w-[200px] h-[200px] inline-flex items-center justify-center cursor-pointer"
//                         >
//                           <div className="flex items-center gap-1">
//                             <ImageUp
//                               className="text-muted-foreground"
//                               size={20}
//                             />
//                             <span className="text-sm text-muted-foreground">
//                               썸네일 선택
//                             </span>
//                           </div>
//                         </label>
//                       </div>

//                       <Input
//                         type="file"
//                         id="thumbnail"
//                         className="hidden"
//                         onChange={handleFile}
//                       />
//                     </>
//                   )}
//                 </Field>
//                 <Field>
//                   <FieldLabel>카테고리</FieldLabel>
//                   <Select value={category} onValueChange={setCategory}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="카테고리를 선택해주세요." />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>Category</SelectLabel>
//                         <SelectItem value="archive">archive</SelectItem>
//                         <SelectItem value="uiux">uiux</SelectItem>
//                         <SelectItem value="project">project</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </Field>
//                 <Field>
//                   <FieldLabel>제목</FieldLabel>
//                   <Input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                 </Field>
//                 <Field>
//                   <FieldLabel>발행/미발행</FieldLabel>
//                   <div>
//                     <Checkbox
//                       checked={isView}
//                       onCheckedChange={() => setIsView(!isView)}
//                     />
//                   </div>
//                 </Field>
//                 <Field>
//                   <FieldLabel>내용</FieldLabel>
//                   <Editor content={content} setContent={setContent} />
//                 </Field>
//               </FieldGroup>
//             </FieldSet>

//             <Button onClick={handleSubmit}>저장</Button>
//           </CardContent>
//         </Card>
//       </article>
//     </section>
//   );
// }

// export { PostCreate };
