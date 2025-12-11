// scripts/rollback.js
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

// 터미널에서 입력받은 되돌릴 버전 ID (예: 20251211-100000)
const targetVersion = process.argv[2];

if (!targetVersion) {
  console.error('❌ 에러: 되돌릴 버전 ID를 입력해주세요.');
  process.exit(1);
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function rollback() {
  console.log(`⏪ 롤백 프로세스 시작... 목표 버전: ${targetVersion}`);

  // 1. 새로운 매니페스트 내용 생성
  // (과거 파일들은 S3에 이미 있다고 가정하고 경로만 적어줍니다)
  const manifest = {
    version: targetVersion,
    updatedAt: new Date().toISOString(),
    files: {
      ko: `locales/ko-${targetVersion}.json`,
      en: `locales/en-${targetVersion}.json`
      // 언어가 더 있다면 여기에 추가
    }
  };

  // 2. S3에 version.json 덮어쓰기 (No Cache)
  const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME; // .env 변수명 확인 필요
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: 'locales/version.json', // 위치 정확히!
    Body: JSON.stringify(manifest, null, 2),
    ContentType: 'application/json',
    CacheControl: 'no-cache, no-store, must-revalidate', // 즉시 반영되도록 캐시 끔
    ACL: 'public-read'
  });

  try {
    await s3Client.send(command);
    console.log(`✅ 롤백 성공! 이제 앱은 [${targetVersion}] 버전을 바라봅니다.`);
  } catch (err) {
    console.error('❌ 롤백 실패:', err);
    process.exit(1);
  }
}

rollback();