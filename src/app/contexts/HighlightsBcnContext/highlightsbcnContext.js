import { createContext } from '../../../utils/context';

const CONTEXT_NAME = 'HighlightsBcnContext';

const defaultState = {

};

const { Context: HighlightsBcnContext, useContext: useHighlightsBcnContext } = createContext(CONTEXT_NAME, defaultState);

export default useHighlightsBcnContext;
export {
  HighlightsBcnContext,
};
