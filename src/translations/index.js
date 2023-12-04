import libConfig from '../app/config/lib';

import libEN from './en';
import libES from './es';

const translations = {
  es: {
    [libConfig.key]: libES,
  },
  en: {
    [libConfig.key]: libEN,
  },
};

export default translations;
