const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // 로컬 테스트용

async function sync() {
  console.log('🔄 번역 동기화 시작...');

  // 1. 환경변수에서 인증 정보 가져오기
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'); // 줄바꿈 문자 처리

  // 2. 구글 시트 접속
  const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0]; // 첫 번째 시트 사용
  const rows = await sheet.getRows();

  // 3. 데이터 파싱 (key, ko, en 컬럼이 있다고 가정)
  const translations = { ko: {}, en: {} }; // 필요한 언어 추가 가능

  rows.forEach((row) => {
    const key = row.get('key');
    if (!key) return; // 키 없으면 패스

    translations.ko[key] = row.get('ko') || '';
    translations.en[key] = row.get('en') || '';
  });

  // 4. JSON 파일 생성 (public/locales 폴더에 저장하거나, S3 업로드용 임시 폴더에 저장)
  // 여기서는 'locales' 라는 폴더를 만들어 저장합니다.
  const outputDir = path.join(__dirname, '../locales');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  for (const [lang, data] of Object.entries(translations)) {
    fs.writeFileSync(
      path.join(outputDir, `${lang}.json`),
      JSON.stringify(data, null, 2)
    );
    console.log(`✅ ${lang}.json 생성 완료`);
  }
}

sync().catch(console.error);