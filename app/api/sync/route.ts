import { NextResponse } from 'next/server';

export async function POST() {
  const GITHUB_PAT = process.env.GITHUB_PAT;
  const OWNER = process.env.GITHUB_OWNER;
  const REPO = process.env.GITHUB_REPO;

  if (!GITHUB_PAT || !OWNER || !REPO) {
    return NextResponse.json(
      { error: '환경변수 설정이 누락되었습니다.' },
      { status: 500 }
    );
  }

  try {
    // GitHub API 호출: Repository Dispatch 이벤트 발생
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/dispatches`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${GITHUB_PAT}`,
        },
        body: JSON.stringify({
          event_type: 'sync_i18n', // YAML 파일의 types: [sync_i18n] 과 일치해야 함
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error:', errorText);
      throw new Error(`GitHub 요청 실패: ${response.status}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: '배포 요청이 성공적으로 전송되었습니다.' 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '배포 요청 중 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}