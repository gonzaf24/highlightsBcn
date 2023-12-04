import { createContext } from 'utils/context';

const CONTEXT_NAME = 'User';

export const defaultState = {
  user: {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    isActive: false,
    isManager: false,
  },
  setUser: () => {},
};

const { Context: UserContext, useContext: useUserContext } = createContext(CONTEXT_NAME, defaultState);

export default useUserContext;
export {
  UserContext,
};
