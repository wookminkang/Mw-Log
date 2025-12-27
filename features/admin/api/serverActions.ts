// app/actions.ts (또는 적절한 위치)
'use server'

import { revalidatePath } from 'next/cache';

export async function revalidatePostList() {
  // 리스트 페이지의 캐시를 강제로 날려버림
  await revalidatePath('/admin/post');
  await revalidatePath('/');
}

export async function revalidateMainPostList() {
  // 리스트 페이지의 캐시를 강제로 날려버림
  revalidatePath('/');
}