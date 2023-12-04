import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import useUserContext from 'app/contexts/UserContext';
import { SettingsForm } from 'modules/settings/forms';
import useSettingsTranslation from 'modules/settings/hooks/useSettingsTranslation';

import styles from './SettingsPage.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const texts = {
  Title: 'SettingsPage.Title',
};

const SettingsPage = ({ className, id }) => {
  const { t } = useSettingsTranslation();
  const { user } = useUserContext();
  const userEmail = user?.email || undefined;
  const settingsPageClassNames = classnames(styles.SettingsPage, className);

  return (
    <div
      className={ settingsPageClassNames }
      id={ id }
    >
      <span className={ styles.Title }>{ t(texts.Title) }</span>
      <SettingsForm userEmail={ userEmail } />
    </div>
  );
};

SettingsPage.propTypes = propTypes;
SettingsPage.defaultProps = defaultProps;

export default SettingsPage;
