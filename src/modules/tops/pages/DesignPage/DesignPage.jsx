import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes, topsRoutes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useTopsTranslation } from 'modules/tops/hooks';

import styles from './DesignPage.module.scss';

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

const DesignPage = ({ className, dataTestId, id }) => {
  const { t } = useTopsTranslation();

  const designPageClassNames = classnames(styles.DesignPage, className);

  return (
    <div
      className={ designPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.tops.path } title={ t(topsRoutes.design.title) } useGoHome />
    </div>
  );
};

DesignPage.propTypes = propTypes;
DesignPage.defaultProps = defaultProps;

export default DesignPage;
