import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes, topsRoutes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import useTopsTranslation from 'modules/tops/hooks/useTopsTranslation';

import styles from './TopsPage.module.scss';

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

const TopsPage = ({ className, dataTestId, id }) => {
  const { t } = useTopsTranslation();

  const topsMenu = useMemo(() => [
    { id: 0, name: t(topsRoutes.buffets.title), path: topsRoutes.buffets.path },
    { id: 1, name: t(topsRoutes.burgers.title), path: topsRoutes.burgers.path },
    { id: 2, name: t(topsRoutes.tacos.title), path: topsRoutes.tacos.path },
    { id: 3, name: t(topsRoutes.design.title), path: topsRoutes.design.path },
  ], [t]);

  const topsPageClassNames = classnames(styles.TopsPage, className);

  return (
    <div className={ topsPageClassNames } data-testid={ dataTestId } id={ id }>
      <MenuItems backPath={ routes.home.path } items={ topsMenu } title={ t(routes.tops.title) } />
    </div>
  );
};

TopsPage.propTypes = propTypes;
TopsPage.defaultProps = defaultProps;

export default TopsPage;
