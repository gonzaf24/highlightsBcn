import { useTranslations } from '../../../app/hooks';
import homeModuleConfig from '../config';

// Will search always first in home translations
const useHomeTranslation = () => useTranslations([homeModuleConfig.key]);

export default useHomeTranslation;
