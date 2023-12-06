import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { barRoutes, routes } from 'app/config/routing';
import { useBarTranslation } from 'modules/bar/hooks';
import { MenuItems } from 'modules/common/components';

import styles from './TerracesPage.module.scss';

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

const TerracesPage = ({ className, dataTestId, id }) => {
  const { t } = useBarTranslation();

  const terracesPageClassNames = classnames(styles.TerracesPage, className);

  return (
    <div
      className={ terracesPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.bar.path } title={ t(barRoutes.terraces.title) } useGoHome />
    </div>
  );
};

TerracesPage.propTypes = propTypes;
TerracesPage.defaultProps = defaultProps;

export default TerracesPage;
