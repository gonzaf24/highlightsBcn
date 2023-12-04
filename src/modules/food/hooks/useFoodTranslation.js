import { useTranslations } from '../../../app/hooks';
import foodModuleConfig from '../config';

// Will search always first in Food translations
const useFoodTranslation = () => useTranslations([foodModuleConfig.key]);

export default useFoodTranslation;
