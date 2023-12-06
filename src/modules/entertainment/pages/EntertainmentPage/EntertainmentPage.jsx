import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { entertainmentRoutes, routes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useEntertainmentTranslation } from 'modules/entertainment/hooks';

import styles from './EntertainmentPage.module.scss';

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

const EntertainmentPage = ({ className, dataTestId, id }) => {
  const { t } = useEntertainmentTranslation();

  const entertainmentMenu = useMemo(() => [
    { id: 0, name: t(entertainmentRoutes.nightlife.title), path: entertainmentRoutes.nightlife.path },
    { id: 1, name: t(entertainmentRoutes.rumbaFlamenco.title), path: entertainmentRoutes.rumbaFlamenco.path },
    { id: 2, name: t(entertainmentRoutes.touristAttractions.title), path: entertainmentRoutes.touristAttractions.path },
  ], [t]);

  const entertainmentPageClassNames = classnames(
    styles.EntertainmentPage,
    className,
  );

  return (
    <div
      className={ entertainmentPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.home.path } items={ entertainmentMenu } title={ t(routes.entertainment.title) } />
    </div>
  );
};

EntertainmentPage.propTypes = propTypes;
EntertainmentPage.defaultProps = defaultProps;

export default EntertainmentPage;
