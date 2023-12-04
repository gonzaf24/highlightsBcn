import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { routes } from 'app/config/routing';
import useAuthContext from 'app/contexts/AuthContext';
import { Button, InputText } from 'modules/common/components';
import commonModuleConfig from 'modules/common/config';
import { useHomeTranslation } from 'modules/home/hooks';

import styles from './RecoveryForm.module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const texts = {
  EmailLabel: 'RecoveryForm.Email.Label',
  EmailPlaceHolder: 'RecoveryForm.Email.PlaceHolder',
  RequiedEmail: 'RecoveryForm.Email.Required',
  EmailError: 'RecoveryForm.Email.Error',
  Send: 'RecoveryForm.Send',
  Login: 'RecoveryForm.Login',
  LoginText: 'RecoveryForm.LoginText',
};

const { REGEX_PATTERNS } = commonModuleConfig;

const RecoveryForm = ({ className, id }) => {
  const { t } = useHomeTranslation();

  const { recover } = useAuthContext();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
  });

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
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

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      const respose = recover(email);
      console.log('recovery ok ? ', respose);
    }
  };

  const loginLabel = ` ${t(texts.Login)}`;
  const recoveryFormClassNames = classnames(styles.RecoveryForm, className);

  return (
    <Form
      autoComplete="off"
      className={ recoveryFormClassNames }
      id={ id }
      noValidate
      onSubmit={ handleSubmit }
    >
      <div className={ styles.InputsWrapper }>

        <InputText
          autoComplete="recovery-email"
          className={ styles.Input }
          error={ errors.email }
          label={ t(texts.EmailLabel) }
          name="recovery-user-email"
          placeholder={ t(texts.EmailPlaceHolder) }
          value={ email }
          onChange={ handleEmailChange }
        />

        <Button className={ styles.Button } isPrimary type="submit">
          {t(texts.Send)}
        </Button>

        <a className={ styles.LoginText } href={ routes.login.path }>
          {t(texts.LoginText)}
          <span className={ styles.Bold }>{loginLabel}</span>
        </a>

      </div>
    </Form>
  );
};

RecoveryForm.propTypes = propTypes;
RecoveryForm.defaultProps = defaultProps;

export default RecoveryForm;
