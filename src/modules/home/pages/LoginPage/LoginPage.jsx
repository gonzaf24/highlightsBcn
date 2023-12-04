import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { LoginForm } from 'modules/home/forms';
import { useHomeTranslation } from 'modules/home/hooks';

import styles from './LoginPage.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const texts = {
  Title: 'LoginPage.Title',
};

const LoginPage = ({ className, id }) => {
  const { t } = useHomeTranslation();

  const loginPageClassNames = classnames(styles.LoginPage, className);

  return (
    <div
      className={ loginPageClassNames }
      id={ id }
    >
      <div className={ styles.FormWrapper }>
        <span className={ styles.Title }>{ t(texts.Title) }</span>
        <LoginForm />
      </div>
    </div>
  );
};

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export default LoginPage;
