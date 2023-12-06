/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { HashRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';

import { createI118nInstance } from '../../../utils/translations';
import libConfig from '../../config/lib';

import { HighlightsBcnContext } from './highlightsbcnContext';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  translations: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  ),
  useDebugMode: PropTypes.bool,
};

const defaultProps = {
  translations: {},
  useDebugMode: false,
};

const HighlightsBcnProvider = ({ children, translations, useDebugMode }) => {
  // TODO: for now is empty, but we can add here some global context
  const contextValue = useMemo(() => ({}), []);
  const i18n = useMemo(
    () => createI118nInstance(translations, { useDebugMode }),
    [translations, useDebugMode],
  );

  return (
    <HighlightsBcnContext.Provider value={ contextValue }>
      <I18nextProvider defaultNS={ libConfig.key } i18n={ i18n }>
        <Router>{children}</Router>
      </I18nextProvider>
    </HighlightsBcnContext.Provider>
  );
};

HighlightsBcnProvider.propTypes = propTypes;
HighlightsBcnProvider.defaultProps = defaultProps;

export default HighlightsBcnProvider;
