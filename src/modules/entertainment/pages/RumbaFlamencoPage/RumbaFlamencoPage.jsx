import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { entertainmentRoutes, routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useEntertainmentTranslation } from 'modules/entertainment/hooks';

import styles from './RumbaFlamencoPage.module.scss';

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

const RumbaFlamencoPage = ({ className, dataTestId, id }) => {
  const { t } = useEntertainmentTranslation();

  const rumbaFlamencoPageClassNames = classnames(styles.RumbaFlamencoPage, className);

  return (
    <div
      className={ rumbaFlamencoPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.bar.path } title={ t(entertainmentRoutes.rumbaFlamenco.title) } useGoHome />
    </div>
  );
};

RumbaFlamencoPage.propTypes = propTypes;
RumbaFlamencoPage.defaultProps = defaultProps;

export default RumbaFlamencoPage;
