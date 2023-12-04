import { createContext } from 'utils/context';

const CONTEXT_NAME = 'toastContext';

const defaultState = {
  addToast: () => {},
  addSuccessToast: () => {},
  addErrorToast: () => {},
  updateToast: () => {},
  removeToast: () => {},
};

const { Context: ToastContext, useContext: useToastContext } = createContext(CONTEXT_NAME, defaultState);

export default useToastContext;
export {
  ToastContext,
};
