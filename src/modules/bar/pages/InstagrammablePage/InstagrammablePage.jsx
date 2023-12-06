import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { barRoutes, routes } from 'app/config/routing';
import { useBarTranslation } from 'modules/bar/hooks';
import { MenuItems } from 'modules/common/components';

import styles from './InstagrammablePage.module.scss';

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

const InstagrammablePage = ({ className, dataTestId, id }) => {
  const { t } = useBarTranslation();

  const instagrammablePageClassNames = classnames(styles.InstagrammablePage, className);

  return (
    <div
      className={ instagrammablePageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.bar.path } title={ t(barRoutes.instagrammable.title) } useGoHome />
    </div>
  );
};

InstagrammablePage.propTypes = propTypes;
InstagrammablePage.defaultProps = defaultProps;

export default InstagrammablePage;
