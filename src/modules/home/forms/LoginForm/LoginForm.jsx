import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import useAuthContext from 'app/contexts/AuthContext';
import { Button, InputText, RoundCheckbox } from 'modules/common/components';
import commonModuleConfig from 'modules/common/config';
import { useHomeTranslation } from 'modules/home/hooks';

import styles from './LoginForm.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const texts = {
  EmailLabel: 'LoginForm.Email.Label',
  EmailPlaceHolder: 'LoginForm.Email.PlaceHolder',
  RequiedEmail: 'LoginForm.Email.Required',
  EmailError: 'LoginForm.Email.Error',
  PasswordLabel: 'LoginForm.Password.Label',
  PasswordPlaceHolder: 'LoginForm.Password.PlaceHolder',
  PasswordRequired: 'LoginForm.Password.Required',
  RememberMe: 'LoginForm.RememberMe',
  ForgotPassword: 'LoginForm.ForgotPassword',
  LoginText: 'LoginForm.Login',
  SignUpText: 'LoginForm.SignUpText',
  SignUp: 'LoginForm.SignUp',
  BadCredentials: 'LoginForm.BadCredentials',
};

const { REGEX_PATTERNS } = commonModuleConfig;

const LoginForm = ({ className, id }) => {
  const { t } = useHomeTranslation();
  const {
    login,
    isLoginLoading,
    hasLoginError,
    rememberMe,
    handleRememberMe,
    rememberMeEmail,
  } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (
      rememberMe
      && rememberMeEmail !== undefined
      && rememberMeEmail !== null
    ) {
      setEmail(rememberMeEmail);
    }
  }, [rememberMe, rememberMeEmail]);

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleRememberMeChange = e => {
    handleRememberMe(e.target.checked);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const tempErrors = {};

    // user validation
    if (!email.trim()) {
      tempErrors.email = t(texts.RequiedEmail);
    } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(email)) {
      tempErrors.email = t(texts.EmailError);
    }

    if (!password.trim()) {
      tempErrors.password = t(texts.PasswordRequired);
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      login(email, password);
      // if login is successfull, then we save the email in the localstorage in case of remember me is checked
      handleRememberMe(rememberMe, email);
    }
  };

  const signUpLabel = ` ${t(texts.SignUp)}`;
  const loginFormClassNames = classnames(styles.LoginForm, className);

  return (
    <Form
      className={ loginFormClassNames }
      id={ id }
      noValidate
      onSubmit={ handleSubmit }
    >
      <div className={ styles.InputsWrapper }>
        <InputText
          className={ styles.Input }
          error={ errors.email }
          label={ t(texts.EmailLabel) }
          name="user-email"
          placeholder={ t(texts.EmailPlaceHolder) }
          value={ email }
          onChange={ handleEmailChange }
        />

        <InputText
          className={ styles.Input }
          error={ errors.password }
          label={ t(texts.PasswordLabel) }
          name="user-password"
          placeholder={ t(texts.PasswordPlaceHolder) }
          type="password"
          value={ password }
          onChange={ handlePasswordChange }
        />

        <RoundCheckbox
          isChecked={ rememberMe }
          label={ t(texts.RememberMe) }
          onChange={ handleRememberMeChange }
        />

        {hasLoginError && (
          <span className={ styles.Error }>{t(texts.BadCredentials)}</span>
        )}

        <Button
          className={ styles.Button }
          isDisabled={ isLoginLoading }
          isPrimary
          type="submit"
        >
          {t(texts.LoginText)}
        </Button>

        <a className={ styles.SignUpText } href={ routes.register.path }>
          {t(texts.SignUpText)}
          <span className={ styles.Bold }>{signUpLabel}</span>
        </a>
        <a className={ styles.ForgotPassword } href={ routes.recovery.path }>
          {t(texts.ForgotPassword)}
        </a>
      </div>
    </Form>
  );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
