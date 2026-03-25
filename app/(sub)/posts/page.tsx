import type { Metadata } from "next";
import { PostList } from "@/app/(main)/components/PostList";
import { buildSiteMetadata } from "@/utils/metaFactory";

export const revalidate = 60;

export const metadata: Metadata = buildSiteMetadata(
  "Posts",
  "작업과 기술 실험을 모아 둔 포스트 목록입니다."
);

export default function PostListPage() {
  return <PostList />;
}
