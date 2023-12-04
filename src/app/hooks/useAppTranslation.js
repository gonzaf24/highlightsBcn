import appConfig from '../config/app';

import useTranslations from './useTranslations';

// Will search always first in app translations
const useAppTranslation = () => useTranslations([appConfig.key]);

export default useAppTranslation;
