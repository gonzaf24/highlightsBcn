import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { barRoutes, routes } from 'app/config/routing';
import { useBarTranslation } from 'modules/bar/hooks';
import { MenuItems } from 'modules/common/components';

import styles from './RooftopsPage.module.scss';

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

const RooftopsPage = ({ className, dataTestId, id }) => {
  const { t } = useBarTranslation();

  const rooftopsPageClassNames = classnames(styles.RooftopsPage, className);

  return (
    <div
      className={ rooftopsPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.bar.path } title={ t(barRoutes.rooftops.title) } useGoHome />
    </div>
  );
};

RooftopsPage.propTypes = propTypes;
RooftopsPage.defaultProps = defaultProps;

export default RooftopsPage;
