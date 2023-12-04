import React from 'react';

import { AuthProvider } from 'app/contexts/AuthContext';
import { HighlightsBcnProvider } from 'app/contexts/HighlightsBcnContext';
import { TeamProvider } from 'app/contexts/TeamContext';
import { ToastProvider } from 'app/contexts/ToastContext';
import { UserProvider } from 'app/contexts/UserContext';

import AppLayout from '../AppLayout';
import config from '../config';
import translations from '../translations';

import '../../styles/theme.scss';
import styles from './App.module.scss';

const DEFAULT_ROUTE = config.routing.commonRoutes.home;
const ROUTES = Object.values(config.routing.routes);
const propTypes = {
};

const defaultProps = {
};

const App = () => (
  <div className={ styles.App }>
    <HighlightsBcnProvider
      translations={ translations }
      useDebugMode={ config.env.DEBUG }
    >
      <ToastProvider>
        <AuthProvider>
          <UserProvider>
            <TeamProvider>
              <AppLayout
                defaultRoute={ DEFAULT_ROUTE }
                routes={ ROUTES }
              />
            </TeamProvider>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
    </HighlightsBcnProvider>
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
