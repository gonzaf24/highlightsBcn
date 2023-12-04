import { useTranslations } from '../../../app/hooks';
import mapLocationsModuleConfig from '../config';

// Will search always first in MapLocations translations
const useMapLocationsTranslation = () => useTranslations([mapLocationsModuleConfig.key]);

export default useMapLocationsTranslation;
