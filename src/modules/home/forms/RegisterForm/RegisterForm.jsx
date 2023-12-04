import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import useAuthContext from 'app/contexts/AuthContext';
import { Button, InputText, RoundCheckbox } from 'modules/common/components';
import commonModuleConfig from 'modules/common/config';
import { useHomeTranslation } from 'modules/home/hooks';

import styles from './RegisterForm.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const texts = {
  EmailLabel: 'RegisterForm.Email.Label',
  EmailPlaceHolder: 'RegisterForm.Email.PlaceHolder',
  RequiedEmail: 'RegisterForm.Email.Required',
  EmailError: 'RegisterForm.Email.Error',
  ErrorPasswordType1: 'RegisterForm.ErrorPassword.Type1',
  ErrorPasswordType2: 'RegisterForm.ErrorPassword.Type2',
  ErrorPasswordType3: 'RegisterForm.ErrorPassword.Type3',
  PasswordLabel: 'RegisterForm.Password.Label',
  PasswordPlaceHolder: 'RegisterForm.Password.PlaceHolder',
  Register: 'RegisterForm.Register',
  LoginText: 'RegisterForm.LoginText',
  Login: 'RegisterForm.Login',
  AcceptTermsText: 'RegisterForm.AcceptTerms.Text',
  AcceptTermsLink: 'RegisterForm.AcceptTerms.Link',
  AcceptTermsError: 'RegisterForm.AcceptTerms.Error',
};

const { REGEX_PATTERNS } = commonModuleConfig;

const RegisterForm = ({ className, id }) => {
  const { t } = useHomeTranslation();

  const { register } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    termsAndConditions: '',
  });

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleAcceptTermsChange = e => {
    setAcceptTerms(e.target.checked);
    setErrors({ ...errors, termsAndConditions: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const tempErrors = {};

    if (!acceptTerms) {
      tempErrors.termsAndConditions = t(texts.AcceptTermsError);
    }

    // user validation
    if (!email.trim()) {
      tempErrors.email = t(texts.RequiedEmail);
    } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(email)) {
      tempErrors.email = t(texts.EmailError);
    }

    // password validation
    if (password.length < 8 || password.length > 20) {
      tempErrors.password = t(texts.ErrorPasswordType1);
    } else if (
      !REGEX_PATTERNS.HAS_LETTERS.test(password)
      || !REGEX_PATTERNS.HAS_NUMBERS.test(password)
    ) {
      tempErrors.password = t(texts.ErrorPasswordType2);
    } else if (
      REGEX_PATTERNS.HAS_WHITESPACE.test(password)
      || REGEX_PATTERNS.HAS_SPECIAL_CHARACTERS.test(password)
    ) {
      tempErrors.password = t(texts.ErrorPasswordType3);
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      const respose = register(email, password);
      console.log('Registered ? ', respose);

      // TODO: here open a toast with the message of the result of the register otherwise show the error message on a toast
      // if login is successfull, then we save the email in the localstorage in case of remember me is checked
    }
  };

  const loginLabel = ` ${t(texts.Login)}`;
  const registerFormClassNames = classnames(styles.RegisterForm, className);

  return (
    <Form
      autoComplete="off"
      className={ registerFormClassNames }
      id={ id }
      noValidate
      onSubmit={ handleSubmit }
    >
      <div className={ styles.InputsWrapper }>
        <InputText
          autoComplete="new-email"
          className={ styles.Input }
          error={ errors.email }
          label={ t(texts.EmailLabel) }
          name="new-user-email"
          placeholder={ t(texts.EmailPlaceHolder) }
          value={ email }
          onChange={ handleEmailChange }
        />

        <InputText
          autoComplete="new-password"
          className={ styles.Input }
          error={ errors.password }
          label={ t(texts.PasswordLabel) }
          name="new-user-password"
          placeholder={ t(texts.PasswordPlaceHolder) }
          type="password"
          value={ password }
          onChange={ handlePasswordChange }
        />

        <div className={ styles.Wrapper }>
          <RoundCheckbox
            className={ styles.AcceptTermsCheckbox }
            error={ errors.termsAndConditions }
            isChecked={ acceptTerms }
            label={ t(texts.AcceptTermsText) }
            onChange={ handleAcceptTermsChange }
          />
          <a
            className={ styles.AcceptTermsLink }
            href={ commonModuleConfig.EXTERNAL_URLS.ACCEPT_TERMS }
            rel="noreferrer"
            target="_blank"
          >
            {t(texts.AcceptTermsLink)}
          </a>
        </div>

        <Button className={ styles.Button } isPrimary type="submit">
          {t(texts.Register)}
        </Button>

        <a className={ styles.LoginText } href={ routes.login.path }>
          {t(texts.LoginText)}
          <span className={ styles.Bold }>{loginLabel}</span>
        </a>
      </div>
    </Form>
  );
};

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
