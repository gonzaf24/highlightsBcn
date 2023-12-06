import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes, topsRoutes } from 'app/config/routing';
import { MenuItems } from 'modules/common/components';
import { useTopsTranslation } from 'modules/tops/hooks';

import styles from './BuffetsPage.module.scss';

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

const BuffetsPage = ({ className, dataTestId, id }) => {
  const { t } = useTopsTranslation();

  const buffetsPageClassNames = classnames(styles.BuffetsPage, className);

  return (
    <div
      className={ buffetsPageClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <MenuItems backPath={ routes.tops.path } title={ t(topsRoutes.buffets.title) } useGoHome />
    </div>
  );
};

BuffetsPage.propTypes = propTypes;
BuffetsPage.defaultProps = defaultProps;

export default BuffetsPage;
