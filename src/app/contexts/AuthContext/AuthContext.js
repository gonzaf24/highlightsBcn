import { createContext } from 'utils/context';

const CONTEXT_NAME = 'Auth';

export const defaultState = {
  isAuthenticated: false,
  accessToken: undefined,
  login: () => {},
  logout: () => {},
  register: () => {},
  recover: () => {},
  rememberMe: false,
  rememberMeEmail: '',
  handleRememberMe: () => {},
  isLoginLoading: false,
  hasLoginError: false,
  user: {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    isActive: false,
    isManager: false,
  },
};

const { Context: AuthContext, useContext: useAuthContext } = createContext(CONTEXT_NAME, defaultState);

export default useAuthContext;
export {
  AuthContext,
};
