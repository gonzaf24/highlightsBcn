import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { RegisterForm } from 'modules/home/forms';
import { useHomeTranslation } from 'modules/home/hooks';

import styles from './RegisterPage.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const texts = {
  Title: 'RegisterPage.Title',
};

const RegisterPage = ({ className, id }) => {
  const { t } = useHomeTranslation();

  const registerPageClassNames = classnames(styles.RegisterPage, className);

  return (
    <div className={ registerPageClassNames } id={ id }>
      <div className={ styles.FormWrapper }>
        <span className={ styles.Title }>{t(texts.Title)}</span>
        <RegisterForm />
      </div>
    </div>
  );
};

RegisterPage.propTypes = propTypes;
RegisterPage.defaultProps = defaultProps;

export default RegisterPage;
