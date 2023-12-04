import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useHomeTranslation } from 'modules/home/hooks';

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

const texts = {
  EtnicalFood: 'FoodPage.Menu.EtnicalFood',
  TapasFood: 'FoodPage.Menu.TapasFood',
};

const FoodPage = ({ className, dataTestId, id }) => {
  const { t } = useHomeTranslation();

  const foodMenu = useMemo(() => [
    { id: 0, name: t(texts.EtnicalFood), path: routes.home.path },
    { id: 1, name: t(texts.TapasFood), path: routes.home.path },
  ], [t]);

  const foodPageClassNames = classnames(styles.FoodPage, className);

  return (
    <div className={ foodPageClassNames } data-testid={ dataTestId } id={ id }>
      <MenuItems items={ foodMenu } />
    </div>
  );
};

FoodPage.propTypes = propTypes;
FoodPage.defaultProps = defaultProps;

export default FoodPage;
