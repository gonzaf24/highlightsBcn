import { useTranslations } from '../../../app/hooks';
import topsModuleConfig from '../config';

// Will search always first in tops translations
const useTopsTranslation = () => useTranslations([topsModuleConfig.key]);

export default useTopsTranslation;
