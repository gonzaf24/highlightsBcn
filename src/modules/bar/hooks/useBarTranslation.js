import { useTranslations } from '../../../app/hooks';
import barModuleConfig from '../config';

// Will search always first in bar translations
const useBarTranslation = () => useTranslations([barModuleConfig.key]);

export default useBarTranslation;
