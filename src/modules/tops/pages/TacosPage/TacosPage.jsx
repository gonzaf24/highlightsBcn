import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes, topsRoutes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useTopsTranslation } from 'modules/tops/hooks';

import styles from './TacosPage.module.scss';

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

const TacosPage = ({ className, dataTestId, id }) => {
  const { t } = useTopsTranslation();

  const tacosPageClassNames = classnames(styles.TacosPage, className);

  return (
    <div
      className={ tacosPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.tops.path } title={ t(topsRoutes.tacos.title) } useGoHome />
    </div>
  );
};

TacosPage.propTypes = propTypes;
TacosPage.defaultProps = defaultProps;

export default TacosPage;
