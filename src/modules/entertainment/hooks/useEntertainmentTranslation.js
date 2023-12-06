import { useTranslations } from '../../../app/hooks';
import entertainmentModuleConfig from '../config';

// Will search always first in Food translations
const useEntertainmentTranslation = () => useTranslations([entertainmentModuleConfig.key]);

export default useEntertainmentTranslation;
