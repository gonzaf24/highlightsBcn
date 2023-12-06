import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { entertainmentRoutes, routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useEntertainmentTranslation } from 'modules/entertainment/hooks';

import styles from './TouristAttractionsPage.module.scss';

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

const TouristAttractionsPage = ({ className, dataTestId, id }) => {
  const { t } = useEntertainmentTranslation();

  const touristAttractionsPageClassNames = classnames(styles.TouristAttractionsPage, className);

  return (
    <div
      className={ touristAttractionsPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.bar.path } title={ t(entertainmentRoutes.touristAttractions.title) } useGoHome />
    </div>
  );
};

TouristAttractionsPage.propTypes = propTypes;
TouristAttractionsPage.defaultProps = defaultProps;

export default TouristAttractionsPage;
