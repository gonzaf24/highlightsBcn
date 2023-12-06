import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { barRoutes, routes } from 'app/config/routing';
import { useBarTranslation } from 'modules/bar/hooks';
import { MenuItems } from 'modules/common/components';

import styles from './SpeakeasyPage.module.scss';

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

const SpeakeasyPage = ({ className, dataTestId, id }) => {
  const { t } = useBarTranslation();

  const speakeasyPageClassNames = classnames(styles.SpeakeasyPage, className);

  return (
    <div
      className={ speakeasyPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.bar.path } title={ t(barRoutes.speakeasy.title) } useGoHome />
    </div>
  );
};

SpeakeasyPage.propTypes = propTypes;
SpeakeasyPage.defaultProps = defaultProps;

export default SpeakeasyPage;
