import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import RecoveryForm from 'modules/home/forms/RecoveryForm';
import { useHomeTranslation } from 'modules/home/hooks';

import styles from './RecoveryPage.module.scss';

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

const texts = {
  Title: 'RecoveryPage.Title',
};

const RecoveryPage = ({ className, dataTestId, id }) => {
  const { t } = useHomeTranslation();

  const recoveryPageClassNames = classnames(styles.RecoveryPage, className);

  return (
    <div className={ recoveryPageClassNames } data-testid={ dataTestId } id={ id }>
      <div className={ styles.FormWrapper }>
        <span className={ styles.Title }>{t(texts.Title)}</span>
        <RecoveryForm />
      </div>
    </div>
  );
};

RecoveryPage.propTypes = propTypes;
RecoveryPage.defaultProps = defaultProps;

export default RecoveryPage;
