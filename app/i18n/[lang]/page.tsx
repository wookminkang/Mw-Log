// app/[lang]/page.tsx
import { getTranslation } from '@/lib/server_i18n';

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
  // async/await로 번역 함수 가져오기
  const { t } = await getTranslation(lang);

  return (
    <main>
      <h1>{t('common.error')}</h1>
      <p>{t('auth.login.desc')}</p>
    </main>
  );
}