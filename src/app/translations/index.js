import appConfig from 'app/config/app';
import appEN from 'app/translations/en';
import appES from 'app/translations/es';
import barModuleConfig from 'modules/bar/config';
import barEN from 'modules/bar/translations/en';
import barES from 'modules/bar/translations/es';
import entertainmentModuleConfig from 'modules/entertainment/config';
import entertainmentEN from 'modules/entertainment/translations/en';
import entertainmentES from 'modules/entertainment/translations/es';
import foodModuleConfig from 'modules/food/config';
import foodEN from 'modules/food/translations/en';
import foodES from 'modules/food/translations/es';
import homeModuleConfig from 'modules/home/config';
import homeEN from 'modules/home/translations/en';
import homeES from 'modules/home/translations/es';
import mapLocationsModuleConfig from 'modules/mapLocations/config';
import mapLocationsEN from 'modules/mapLocations/translations/en';
import mapLocationsES from 'modules/mapLocations/translations/es';
import settingsModuleConfig from 'modules/settings/config';
import settingsEn from 'modules/settings/translations/en';
import settingsEs from 'modules/settings/translations/es';
import topsModuleConfig from 'modules/tops/config';
import topsEN from 'modules/tops/translations/en';
import topsES from 'modules/tops/translations/es';

// Export all translations by language and namespace

const translations = {
  es: {
    [homeModuleConfig.key]: homeES,
    [appConfig.key]: appES,
    [settingsModuleConfig.key]: settingsEs,
    [foodModuleConfig.key]: foodES,
    [barModuleConfig.key]: barES,
    [entertainmentModuleConfig.key]: entertainmentES,
    [topsModuleConfig.key]: topsES,
    [mapLocationsModuleConfig.key]: mapLocationsES,
  },
  en: {
    [homeModuleConfig.key]: homeEN,
    [appConfig.key]: appEN,
    [settingsModuleConfig.key]: settingsEn,
    [foodModuleConfig.key]: foodEN,
    [barModuleConfig.key]: barEN,
    [entertainmentModuleConfig.key]: entertainmentEN,
    [topsModuleConfig.key]: topsEN,
    [mapLocationsModuleConfig.key]: mapLocationsEN,
  },
};

export default translations;
