import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { InfoIcon } from 'assets/icons';
import { Button, InputPassword, InputText, Switch } from 'modules/common/components';
import commonModuleConfig from 'modules/common/config';
import useSettingsTranslation from 'modules/settings/hooks/useSettingsTranslation';

import styles from './SettingsForm.module.scss';

const propTypes = {
  userEmail: PropTypes.string.isRequired,
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
  Email: 'SettingsForm.Email',
  EmailPlaceHolder: 'SettingsForm.Email.Placeholder',
  EmailRequierd: 'SettingsForm.Email.Required',
  EmailError: 'SettingsForm.Email.Error',

  PasswordLabel: 'SettingsForm.Password.Label',
  PasswordPlaceHolder: 'SettingsForm.Password.Placeholder',
  PasswordRequired: 'SettingsForm.Password.Required',
  PasswordError: 'SettingsForm.Password.Error',

  NewPasswordLabel: 'SettingsForm.NewPassword.Label',
  NewPasswordPlaceHolder: 'SettingsForm.NewPassword.Placeholder',
  NewPasswordRequierd: 'SettingsForm.NewPassword.Required',
  NewPasswordError: 'SettingsForm.NewPassword.Error',

  ConfirmPasswordLabel: 'SettingsForm.ConfirmPassword.Label',
  ConfirmPasswordPlaceHolder: 'SettingsForm.ConfirmPassword.Placeholder',
  ConfirmPasswordRequierd: 'SettingsForm.ConfirmPassword.Required',
  ConfirmPasswordError: 'SettingsForm.ConfirmPassword.Error',

  TwoFactorAuthLabel: 'SettingsForm.TwoFactorAuth.Label',

  EmailTwoFactorAuthPlaceHolder: 'SettingsForm.EmailTwoFactorAuth.Placeholder',
  EmailTwoFactorAuthRequired: 'SettingsForm.EmailTwoFactorAuth.Required',
  EmailTwoFactorAuthError: 'SettingsForm.EmailTwoFactorAuth.Error',
  EmailTwoFactorTextInfo: 'SettingsForm.EmailTwoFactorAuth.Text.Info',

  PhoneTwoFactorAuthPlaceHolder: 'SettingsForm.PhoneTwoFactorAuth.Placeholder',
  PhoneTwoFactorAuthRequired: 'SettingsForm.PhoneTwoFactorAuth.Required',
  PhoneTwoFactorAuthError: 'SettingsForm.PhoneTwoFactorAuth.Error',
  PhoneTwoFactorAuthTextInfo: 'SettingsForm.PhoneTwoFactorAuth.Text.Info',

  PasswordsDoNotMatch: 'SettingsForm.PasswordsDoNotMatch',

  Save: 'SettingsForm.Save',
};

const { REGEX_PATTERNS } = commonModuleConfig;

const SettingsForm = ({ className, dataTestId, id, userEmail }) => {
  const { t } = useSettingsTranslation();

  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailTwoFactorAuth, setEmailTwoFactorAuth] = useState('');
  const [isActiveEmail2FA, setIsActiveEmail2FA] = useState(false);
  const [phoneTwoFactorAuth, setPhoneTwoFactorAuth] = useState('');
  const [isActivePhone2FA, setIsActivePhone2FA] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    emailTwoFactorAuth: '',
    phoneTwoFactorAuth: '',
    isActiveEmail2FA: '',
    isActivePhone2FA: '',
  });

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value);
    setErrors({ ...errors, newPassword: '' });
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
    setErrors({ ...errors, confirmPassword: '' });
  };

  const handleEmailTwoFactorAuthChange = e => {
    setEmailTwoFactorAuth(e.target.value);
    setErrors({ ...errors, emailTwoFactorAuth: '' });
  };

  const handleIsActiveEmail2FAChange = e => {
    setIsActiveEmail2FA(e.target.checked);
    setErrors({ ...errors, isActiveEmail2FA: '' });
  };

  const handlePhoneTwoFactorAuthChange = e => {
    setPhoneTwoFactorAuth(e.target.value);
    setErrors({ ...errors, phoneTwoFactorAuth: '' });
  };

  const handleIsActivePhone2FAChange = e => {
    setIsActivePhone2FA(e.target.checked);
    setErrors({ ...errors, isActivePhone2FA: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const tempErrors = {};

    // user validation
    if (!email.trim()) {
      tempErrors.email = t(texts.EmailRequierd);
    } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(email)) {
      tempErrors.email = t(texts.EmailRequierd);
    }

    const anyFieldInformed = password.trim() || newPassword.trim() || confirmPassword.trim();

    if (anyFieldInformed) {
      // password validation
      if (!password.trim()) {
        tempErrors.password = t(texts.PasswordRequired);
      } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(password)) {
        // tempErrors.password = t(texts.PasswordRequired);
      }

      // newPassword validation
      if (!newPassword.trim()) {
        tempErrors.newPassword = t(texts.NewPasswordRequierd);
      } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(newPassword)) {
        // tempErrors.newPassword = t(texts.NewPasswordRequierd);
      }

      // confirmPassword validation
      if (!confirmPassword.trim()) {
        tempErrors.confirmPassword = t(texts.ConfirmPasswordRequierd);
      } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(confirmPassword)) {
        // tempErrors.confirmPassword = t(texts.ConfirmPasswordRequierd);
      }

      if (!tempErrors.newPassword && !tempErrors.confirmPassword && newPassword !== confirmPassword) {
        tempErrors.confirmPassword = t(texts.PasswordsDoNotMatch);
        tempErrors.newPassword = t(texts.PasswordsDoNotMatch);
      }
    }

    if (isActiveEmail2FA) {
    // emailTwoFactorAuth validation
      if (!emailTwoFactorAuth.trim()) {
        tempErrors.emailTwoFactorAuth = t(texts.EmailTwoFactorAuthRequired);
      } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(emailTwoFactorAuth)) {
        tempErrors.emailTwoFactorAuth = t(texts.EmailTwoFactorAuthRequired);
      }
    }

    if (isActivePhone2FA) {
    // phoneTwoFactorAuth validation
      if (!phoneTwoFactorAuth.trim()) {
        tempErrors.phoneTwoFactorAuth = t(texts.PhoneTwoFactorAuthRequired);
      } else if (!REGEX_PATTERNS.EMAIL_FORMAT.test(phoneTwoFactorAuth)) {
        tempErrors.phoneTwoFactorAuth = t(texts.PhoneTwoFactorAuthRequired);
      }
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      // console.log(' save creator');
    }
  };

  const settingsFormClassNames = classnames(styles.SettingsForm, className);

  return (
    <div
      className={ settingsFormClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <Form
        autoComplete="off"
        className={ settingsFormClassNames }
        data-testid={ dataTestId }
        id={ id }
        noValidate
        onSubmit={ handleSubmit }
      >
        <div className={ styles.Container }>
          <div className={ styles.ContainerWrapper }>
            <InputText
              autoComplete="new-email"
              className={ styles.Input }
              disabled
              error={ errors.email }
              label={ t(texts.Email) }
              name="new-email"
              placeholder={ t(texts.EmailPlaceHolder) }
              value={ email }
              onChange={ handleEmailChange }
            />
            <InputPassword
              autoComplete="new-password"
              className={ styles.Input }
              error={ errors.password }
              label={ t(texts.PasswordLabel) }
              name="new-password"
              value={ password }
              onChange={ handlePasswordChange }
            />
            <InputPassword
              autoComplete="new-newPassword"
              className={ styles.Input }
              error={ errors.newPassword }
              label={ t(texts.NewPasswordLabel) }
              name="new-newPassword"
              value={ newPassword }
              onChange={ handleNewPasswordChange }
            />
            <InputPassword
              autoComplete="new-confirmPassword"
              className={ styles.Input }
              error={ errors.confirmPassword }
              label={ t(texts.ConfirmPasswordLabel) }
              name="new-confirmPassword"
              value={ confirmPassword }
              onChange={ handleConfirmPasswordChange }
            />
          </div>
          <div className={ styles.ContainerRightWrapper }>

            <span className={ styles.TwoFactorLabel }>{ t(texts.TwoFactorAuthLabel)}</span>
            <div className={ styles.Wrapper }>
              <div className={ styles.InputWrapper }>
                <InputText
                  autoComplete="new-emailTwoFactorAuth"
                  className={ styles.Input }
                  error={ errors.emailTwoFactorAuth }
                  name="new-emailTwoFactorAuth"
                  placeholder={ t(texts.EmailTwoFactorAuthPlaceHolder) }
                  value={ emailTwoFactorAuth }
                  onChange={ handleEmailTwoFactorAuthChange }
                />
                <Switch isChecked={ isActiveEmail2FA } onChange={ handleIsActiveEmail2FAChange } />
              </div>
              <div className={ styles.Info }>
                <InfoIcon className={ styles.Icon } />
                <span className={ styles.InfoText }>{t(texts.EmailTwoFactorTextInfo)}</span>
              </div>

            </div>
            <div className={ styles.Wrapper }>
              <div className={ styles.InputWrapper }>
                <InputText
                  autoComplete="new-phoneTwoFactorAuth"
                  className={ styles.Input }
                  error={ errors.phoneTwoFactorAuth }
                  name="new-phoneTwoFactorAuth"
                  placeholder={ t(texts.PhoneTwoFactorAuthPlaceHolder) }
                  value={ phoneTwoFactorAuth }
                  onChange={ handlePhoneTwoFactorAuthChange }
                />
                <Switch isChecked={ isActivePhone2FA } onChange={ handleIsActivePhone2FAChange } />
              </div>
              <div className={ styles.Info }>
                <InfoIcon className={ styles.Icon } />
                <span className={ styles.InfoText }>{t(texts.PhoneTwoFactorAuthTextInfo)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={ styles.ButtonWrapper }>
          <Button className={ styles.Button } isPrimary type="submit">{t(texts.Save)}</Button>
        </div>
      </Form>
    </div>
  );
};

SettingsForm.propTypes = propTypes;
SettingsForm.defaultProps = defaultProps;

export default SettingsForm;
