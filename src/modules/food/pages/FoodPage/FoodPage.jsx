import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { foodRoutes, routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useFoodTranslation } from 'modules/food/hooks';

import styles from './FoodPage.module.scss';

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

const FoodPage = ({ className, dataTestId, id }) => {
  const { t } = useFoodTranslation();

  const foodMenu = useMemo(() => [
    { id: 0, name: t(foodRoutes.etnical.title), path: foodRoutes.etnical.path },
    { id: 1, name: t(foodRoutes.tapas.title), path: foodRoutes.tapas.path },
  ], [t]);

  const foodPageClassNames = classnames(styles.FoodPage, className);

  return (
    <div className={ foodPageClassNames } data-testid={ dataTestId } id={ id }>
      <MenuItems backPath={ routes.home.path } items={ foodMenu } title={ t(routes.food.title) } />
    </div>
  );
};

FoodPage.propTypes = propTypes;
FoodPage.defaultProps = defaultProps;

export default FoodPage;
