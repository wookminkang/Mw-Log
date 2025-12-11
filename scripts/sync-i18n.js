const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function generateVersion() {
  const now = new Date();
  // 1. "Asia/Seoul" 시간대의 문자열을 뽑아냅니다.
  // GitHub Actions(UTC)에서도 강제로 한국 시간을 가져옵니다.
  const kstDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

  const yyyy = kstDate.getFullYear();
  const mm = String(kstDate.getMonth() + 1).padStart(2, '0');
  const dd = String(kstDate.getDate()).padStart(2, '0');
  const hh = String(kstDate.getHours()).padStart(2, '0');
  const min = String(kstDate.getMinutes()).padStart(2, '0');
  const sec = String(kstDate.getSeconds()).padStart(2, '0');

  
  return `${yyyy}${mm}${dd}-${hh}${min}${sec}`;
}


async function sync() {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
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

  if (rows.length < 5) {
    throw new Error(`데이터가 너무 적습니다 (${rows.length}행).`);
  }

  const translations = { ko: {}, en: {} };
  const versionTag = generateVersion(); 

  rows.forEach((row) => {
    const key = row.get('key');
    if (!key) return;
    translations.ko[key] = row.get('ko') || '';
    translations.en[key] = row.get('en') || '';
  });

  // ⭐ 핵심 수정: 무조건 루트의 'locales' 폴더에 저장하도록 강제
  const outputDir = path.join(process.cwd(), 'locales');
  console.log(`저장할 폴더 경로: ${outputDir}`);

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  const manifestFiles = {};

  for (const [lang, data] of Object.entries(translations)) {
    const fileName = `${lang}-${versionTag}.json`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    manifestFiles[lang] = `locales/${fileName}`;
    console.log(`파일 생성됨: ${filePath}`);
  }

  const manifest = {
    version: versionTag,
    updatedAt: new Date().toISOString(),
    files: manifestFiles
  };

  fs.writeFileSync(path.join(outputDir, 'version.json'), JSON.stringify(manifest, null, 2));
}

sync().catch((err) => {
  console.error('에러 발생:', err);
  process.exit(1);
});