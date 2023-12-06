import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { foodRoutes, routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useFoodTranslation } from 'modules/food/hooks';

import styles from './TapasPage.module.scss';

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

const TapasPage = ({ className, dataTestId, id }) => {
  const { t } = useFoodTranslation();

  const tapasPageClassNames = classnames(styles.TapasPage, className);

  return (
    <div
      className={ tapasPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.food.path } title={ t(foodRoutes.tapas.title) } useGoHome />
    </div>
  );
};

TapasPage.propTypes = propTypes;
TapasPage.defaultProps = defaultProps;

export default TapasPage;
