
import { useTranslation } from '../../lib/server_i18n';
import Ttmm from '@/components/i18nclient/ttmm';

export default async function I18nPage() {
  const { t } = await useTranslation('ko'); 
  return <div>
    {t('auth.login.title')}
    
      <Ttmm />
    </div>;
}
