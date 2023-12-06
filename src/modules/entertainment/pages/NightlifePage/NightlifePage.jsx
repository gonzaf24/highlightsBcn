import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { entertainmentRoutes, routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useEntertainmentTranslation } from 'modules/entertainment/hooks';

import styles from './NightlifePage.module.scss';

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

const NightlifePage = ({ className, dataTestId, id }) => {
  const { t } = useEntertainmentTranslation();

  const nightlifePageClassNames = classnames(styles.NightlifePage, className);

  return (
    <div
      className={ nightlifePageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.bar.path } title={ t(entertainmentRoutes.nightlife.title) } useGoHome />
    </div>
  );
};

NightlifePage.propTypes = propTypes;
NightlifePage.defaultProps = defaultProps;

export default NightlifePage;
