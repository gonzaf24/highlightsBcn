import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useAuthContext from '../AuthContext';

import { TeamContext } from './TeamContext';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const defaultProps = {
};

const TeamProvider = ({ children }) => {
  const { team } = useAuthContext();

  const contextValue = useMemo(() => ({
    team,
  }), [
    team,
  ]);

  return (
    <TeamContext.Provider
      value={ contextValue }
    >
      { children }
    </TeamContext.Provider>
  );
};

TeamProvider.propTypes = propTypes;
TeamProvider.defaultProps = defaultProps;

export default TeamProvider;
