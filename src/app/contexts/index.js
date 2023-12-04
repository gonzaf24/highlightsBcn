import useAuthContext, { AuthContext, AuthProvider } from './AuthContext';
import useHighlightsBcnContext, { HighlightsBcnContext, HighlightsBcnProvider } from './HighlightsBcnContext';
import useToastContext, { ToastContext, ToastProvider } from './ToastContext';
import useUserContext, { UserContext, UserProvider } from './UserContext';

export default {
  UserContext,
  UserProvider,
  useUserContext,
  HighlightsBcnContext,
  HighlightsBcnProvider,
  useHighlightsBcnContext,
  AuthContext,
  AuthProvider,
  useAuthContext,
  ToastContext,
  ToastProvider,
  useToastContext,
};
