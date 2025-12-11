const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * 1. 타임스탬프 버전 생성 함수 (YYYYMMDD-HHmmss)
 * 예: 20251211-143000
 */
function generateVersion() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const sec = String(now.getSeconds()).padStart(2, '0');
  
  return `${yyyy}${mm}${dd}-${hh}${min}${sec}`;
}

async function sync() {
  console.log('🚀 번역 동기화 시작...');

  // 1. 환경변수 및 인증
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
  // 줄바꿈 문자 처리 (.env에서 가져올 때 \n이 문자로 인식되는 경우 방지)
  const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  // 🛡️ [안전장치] 데이터 검증 로직
  // 행이 너무 적거나 없으면 아예 에러를 내고 중단시킵니다.
  if (rows.length < 5) { // 최소 5줄은 있어야 한다고 가정
    throw new Error(`🚨 비상! 데이터가 너무 적습니다 (현재 ${rows.length}행). 시트가 삭제된 것 같습니다.`);
  }

  // 2. 데이터 파싱
  const translations = { ko: {}, en: {} };
  
  // ⭐ GitTag 대신 타임스탬프로 버전을 생성합니다.
  const versionTag = generateVersion(); 
  console.log(`📌 생성된 버전 ID: ${versionTag}`);

  rows.forEach((row) => {
    const key = row.get('key');
    if (!key) return;

    translations.ko[key] = row.get('ko') || '';
    translations.en[key] = row.get('en') || '';
  });

  // 3. 파일 생성 준비
  // public/locales 폴더에 저장한다고 가정 (Next.js 구조)
  const outputDir = path.join(__dirname, '../public/locales');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 4. 언어별 JSON 파일 생성 (버전명 포함)
  // 예: ko-20251211-103000.json
  const manifestFiles = {};

  for (const [lang, data] of Object.entries(translations)) {
    const fileName = `${lang}-${versionTag}.json`;
    const filePath = path.join(outputDir, fileName);
    
    // 파일 쓰기
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    // 매니페스트에 기록할 경로 저장
    manifestFiles[lang] = `locales/${fileName}`;
    console.log(`✅ 파일 생성: ${fileName}`);
  }

  // 5. 매니페스트(version.json) 생성
  // 프론트엔드는 이 파일만 바라보고 최신 버전이 무엇인지 파악합니다.
  const manifest = {
    version: versionTag,
    updatedAt: new Date().toISOString(),
    files: manifestFiles
  };

  const manifestPath = path.join(outputDir, 'version.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('🎉 version.json 갱신 완료! 동기화가 끝났습니다.');
}

sync().catch((err) => {
  console.error('❌ 에러 발생:', err.message);
  process.exit(1); // 에러 발생 시 프로세스 실패 처리
});