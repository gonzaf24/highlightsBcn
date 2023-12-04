import { createContext } from 'utils/context';

const CONTEXT_NAME = 'Team';

export const defaultState = {
  team: {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    isActive: false,
    isManager: false,
  },
  setTeam: () => {},
};

const { Context: TeamContext, useContext: useTeamContext } = createContext(CONTEXT_NAME, defaultState);

export default useTeamContext;
export {
  TeamContext,
};
