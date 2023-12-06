import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { foodRoutes, routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useFoodTranslation } from 'modules/food/hooks';

import styles from './EtnicalPage.module.scss';

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

const EtnicalPage = ({ className, dataTestId, id }) => {
  const { t } = useFoodTranslation();

  const etnicalPageClassNames = classnames(styles.EtnicalPage, className);

  return (
    <div
      className={ etnicalPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.food.path } title={ t(foodRoutes.etnical.title) } useGoHome />
    </div>
  );
};

EtnicalPage.propTypes = propTypes;
EtnicalPage.defaultProps = defaultProps;

export default EtnicalPage;
