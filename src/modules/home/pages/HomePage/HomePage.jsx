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

const texts = {
  MenuFood: 'HomePage.Menu.Food',
  MenuBar: 'HomePage.Menu.Bar',
  MenuEntretainment: 'HomePage.Menu.Entretainment',
  MenuTops: 'HomePage.Menu.Tops',
  MenuMapLocations: 'HomePage.Menu.MapLocations',
};

const HomePage = ({ className, dataTestId, id }) => {
  const { t } = useHomeTranslation();

  const homeMenu = useMemo(() => [{ id: 0, name: t(texts.MenuFood), path: routes.food.path },
    { id: 1, name: t(texts.MenuBar), path: routes.bar.path },
    { id: 2, name: t(texts.MenuEntretainment), path: routes.entretainment.path },
    { id: 3, name: t(texts.MenuTops), path: routes.tops.path },
    { id: 4, name: t(texts.MenuMapLocations), path: routes.mapLocations.path }], [t]);

  const homePageClassNames = classnames(styles.HomePage, className);

  return (
    <div className={ homePageClassNames } data-testid={ dataTestId } id={ id }>
      <MenuItems items={ homeMenu } />
    </div>
  );
};

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
