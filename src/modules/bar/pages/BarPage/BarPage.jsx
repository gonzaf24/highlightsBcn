import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { barRoutes, routes } from 'app/config/routing';
import { useBarTranslation } from 'modules/bar/hooks';
import { MenuItems } from 'modules/common/components';

import styles from './BarPage.module.scss';

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

const BarPage = ({ className, dataTestId, id }) => {
  const { t } = useBarTranslation();

  const barMenu = useMemo(() => [
    { id: 0, name: t(barRoutes.terraces.title), path: barRoutes.terraces.path },
    { id: 1, name: t(barRoutes.rooftops.title), path: barRoutes.rooftops.path },
    { id: 2, name: t(barRoutes.speakeasy.title), path: barRoutes.speakeasy.path },
    { id: 3, name: t(barRoutes.instagrammable.title), path: barRoutes.instagrammable.path },
  ], [t]);

  const barPageClassNames = classnames(styles.BarPage, className);

  return (
    <div className={ barPageClassNames } data-testid={ dataTestId } id={ id }>
      <MenuItems backPath={ routes.home.path } items={ barMenu } title={ t(routes.bar.title) } />
    </div>
  );
};

BarPage.propTypes = propTypes;
BarPage.defaultProps = defaultProps;

export default BarPage;
