import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useHomeTranslation } from 'modules/home/hooks';

import styles from './HomePage.module.scss';

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

const HomePage = ({ className, dataTestId, id }) => {
  const { t } = useHomeTranslation();

  const homeMenu = useMemo(() => [{ id: 0, name: t(routes.food.title), path: routes.food.path },
    { id: 1, name: t(routes.bar.title), path: routes.bar.path },
    { id: 2, name: t(routes.entertainment.title), path: routes.entertainment.path },
    { id: 3, name: t(routes.tops.title), path: routes.tops.path },
    { id: 4, name: t(routes.mapLocations.title), path: routes.mapLocations.path }], [t]);

  const homePageClassNames = classnames(styles.HomePage, className);

  return (
    <div className={ homePageClassNames } data-testid={ dataTestId } id={ id }>
      <h1>{t('home.title')}</h1>
      <MenuItems items={ homeMenu } />
    </div>
  );
};

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
