import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes, topsRoutes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useTopsTranslation } from 'modules/tops/hooks';

import styles from './BurgersPage.module.scss';

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

const BurgersPage = ({ className, dataTestId, id }) => {
  const { t } = useTopsTranslation();

  const burgersPageClassNames = classnames(styles.BurgersPage, className);

  return (
    <div
      className={ burgersPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.tops.path } title={ t(topsRoutes.burgers.title) } useGoHome />
    </div>
  );
};

BurgersPage.propTypes = propTypes;
BurgersPage.defaultProps = defaultProps;

export default BurgersPage;
