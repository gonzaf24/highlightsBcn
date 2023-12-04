import { useTranslations } from '../../../app/hooks';
import settingsModuleConfig from '../config';

// Will search always first in Settings translations
const useSettingsTranslation = () => useTranslations([settingsModuleConfig.key]);

export default useSettingsTranslation;
