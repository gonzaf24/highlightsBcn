import React from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useTranslations } from 'app/hooks';

import Modal from '../Modal/Modal';

import styles from './ActionModal.module.scss';

const propTypes = {
  acceptClassName: PropTypes.string,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  backdropClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  rejectClassName: PropTypes.string,
  texts: PropTypes.shape({
    acceptButton: PropTypes.string,
    rejectButton: PropTypes.string,
    title: PropTypes.string,
  }),
  onAccept: PropTypes.func,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
  onReject: PropTypes.func,

};

const defaultProps = {
  acceptClassName: undefined,
  backdrop: true,
  backdropClassName: undefined,
  children: undefined,
  className: '',
  dataTestId: undefined,
  header: undefined,
  id: undefined,
  isOpen: false,
  isLoading: false,
  rejectClassName: undefined,
  texts: {
    acceptButton: 'ActionModal.acceptButton',
    rejectButton: 'ActionModal.rejectButton',
  },
  onAccept: undefined,
  onClose: undefined,
  onHide: undefined,
  onReject: undefined,
};

const ActionModal = ({
  children, className, dataTestId, id, isOpen,
  isLoading, texts: textsProp, header, onAccept, onClose, onHide, onReject,
  acceptClassName, rejectClassName, backdrop, backdropClassName,
}) => {
  const texts = { ...defaultProps.texts, ...textsProp };
  const { t } = useTranslations();

  const acceptButtonClassNames = classnames(styles.Button, styles.AcceptButton, acceptClassName);
  const rejectButtonClassNames = classnames(styles.Button, styles.RejectButton, rejectClassName);
  const actionModalClassNames = classnames(styles.ActionModal, className);

  if (!isOpen) return null;

  return (
    <Modal
      backdrop={ backdrop }
      backdropClassName={ backdropClassName }
      className={ actionModalClassNames }
      data-testid={ dataTestId }
      footer={ (
        <div className={ styles.Wrapper }>
          { onReject && (
          <Button
            className={ rejectButtonClassNames }
            onClick={ onReject }
          >
            { t(texts.rejectButton) }
          </Button>
          )}
          { onAccept && (
          <Button
            className={ acceptButtonClassNames }
            onClick={ onAccept }
          >
            { t(texts.acceptButton) }
          </Button>
          )}
        </div>
      ) }
      header={ header }
      id={ id }
      isLoading={ isLoading }
      isOpen
      onClose={ onClose }
      onHide={ onHide }
    >
      {children}
    </Modal>
  );
};

ActionModal.propTypes = propTypes;
ActionModal.defaultProps = defaultProps;

export default ActionModal;
