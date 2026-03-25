import type { Metadata } from "next";

const SITE_NAME = "Mw Log";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mwlog.vercel.app";
const AUTHOR = "돌멩이";
const CREATOR = "강민욱";
const DEFAULT_OG = `${SITE_URL}/og-default.png`;

type Post = {
  id: string | number;
  title: string;
  content_preview?: string | null;
  thumbnail?: string | null;
  category?: string | null;
  created_at?: string | null;
};

/** SEO description 최대 길이 (검색엔진 권장 155자) */
const SEO_DESC_LIMIT = 155;

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - 1) + "…";
}

/**
 * 포스트 데이터로 완전한 Metadata 객체를 생성합니다.
 * generateMetadata 에서 직접 사용하세요.
 */
export function buildPostMetadata(post: Post | null): Metadata {
  if (!post) {
    return {
      title: `포스트를 찾을 수 없습니다 | ${SITE_NAME}`,
    };
  }

  const title = `${post.title} | ${SITE_NAME}`;
  const rawDesc = post.content_preview ?? post.title;
  const description = truncate(rawDesc, SEO_DESC_LIMIT);
  const image = post.thumbnail ?? DEFAULT_OG;
  const url = `${SITE_URL}/posts/${post.id}`;

  return {
    title,
    description,
    keywords: post.category ? [post.category] : undefined,
    authors: [{ name: AUTHOR }],
    creator: CREATOR,
    applicationName: SITE_NAME,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: SITE_NAME,
      ...(post.created_at ? { publishedTime: post.created_at } : {}),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@wookminkang",
    },
  };
}

/**
 * 사이트 기본 메타데이터 (목록 페이지 등에서 사용)
 */
export function buildSiteMetadata(
  pageTitle: string,
  description?: string
): Metadata {
  const title = `${pageTitle} | ${SITE_NAME}`;
  const desc = description ?? `${pageTitle} - ${SITE_NAME}`;

  return {
    title,
    description: desc,
    authors: [{ name: AUTHOR }],
    creator: CREATOR,
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      title,
      description: desc,
      siteName: SITE_NAME,
      url: SITE_URL,
      images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [DEFAULT_OG],
      creator: "@wookminkang",
    },
  };
}
