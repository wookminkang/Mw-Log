// 경력사항 타입 정의
export type WORK_EXPERIENCE_TYPE = {
  company: string;
  title: string;
}

// 포스트 목록 아이템 타입 (공유)
export type PostItem = {
  id: string;
  title: string;
  content_preview?: string;
  thumbnail?: string;
  category?: string;
  created_at: string;
}


// 포스트 타입 정의
export type POST_TYPE = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 포스트 상세 타입 정의
export type POST_DETAIL_TYPE = {
  title: string;
  content: string;
  created_at: string;
  thumbnail?: string;
  status: string;
  isView: boolean;
  id: Promise<string>;
  category?: string;
  author: string;
}

