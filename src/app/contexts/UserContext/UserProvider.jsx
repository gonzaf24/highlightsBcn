import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useAuthContext from '../AuthContext';

import { UserContext } from './UserContext';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const defaultProps = {
};

const UserProvider = ({ children }) => {
  const { user } = useAuthContext();

  const contextValue = useMemo(() => ({
    user,
  }), [
    user,
  ]);

  return (
    <UserContext.Provider
      value={ contextValue }
    >
      { children }
    </UserContext.Provider>
  );
};

UserProvider.propTypes = propTypes;
UserProvider.defaultProps = defaultProps;

export default UserProvider;
