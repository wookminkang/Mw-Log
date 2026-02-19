export type POST_TYPE<T = unknown> = {
  title: string;
  content?: T;
  category?: string;
  thumbnail?: string;
  status: string;
  project?: string;
  content_preview?: string;
};
