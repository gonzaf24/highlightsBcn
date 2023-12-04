import React, { useMemo, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import languageConfig from 'app/config/language';
import { useOpenToggle, useTranslations } from 'app/hooks';
import useClickOutside from 'app/hooks/useClickOutside';
import { EnglandFlagIcon, SpainFlagIcon, TickIcon } from 'assets/icons';
import { Button } from 'modules/common/components';

import styles from './LanguageSelector.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
};

const LanguageSelector = ({ className, dataTestId, id }) => {
  const menuLangRef = useRef(null);

  const { language, setLanguage } = useTranslations();

  const {
    isOpen: isOpenMenu,
    open: openMenu,
    close: closeMenu,
  } = useOpenToggle(false);

  const onButtonLanguageClick = () => {
    if (isOpenMenu) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const onLanguageSelect = lang => {
    setLanguage(lang);
    closeMenu();
  };

  useClickOutside(menuLangRef, closeMenu);

  const FlagIcon = useMemo(() => {
    if (language === languageConfig.LANGUAGE.EN.key) {
      return EnglandFlagIcon;
    }
    return SpainFlagIcon;
  }, [language]);

  const menuClassNames = classnames(styles.Menu, {
    [styles.IsOpen]: isOpenMenu,
  });

  const languageSelectorClassNames = classnames(
    styles.LanguageSelector,
    className,
  );

  return (
    <div
      ref={ menuLangRef }
      className={ languageSelectorClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <button className={ styles.Button } type="button" onClick={ onButtonLanguageClick }>
        <FlagIcon />
        <p className={ styles.Name }>{language.toUpperCase()}</p>
      </button>
      <div className={ menuClassNames }>
        {languageConfig.LANGUAGES.map(lang => (
          <Button
            key={ lang.key }
            className={ styles.ButtonMenu }
            onClick={ () => onLanguageSelect(lang.key) }
          >
            <lang.icon className={ styles.Logo } />
            <p className={ styles.Name }>{lang.label}</p>
            {language === lang.key && <TickIcon className={ styles.TickIcon } />}
          </Button>
        ))}
      </div>
    </div>
  );
};

LanguageSelector.propTypes = propTypes;
LanguageSelector.defaultProps = defaultProps;

export default LanguageSelector;
