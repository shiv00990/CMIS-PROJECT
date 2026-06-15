import { useContext } from 'react';
import AuthContext from './AuthContext'; // Note: Imports the DEFAULT export

// This hook is a named export
export const useAuth = () => useContext(AuthContext);
export default useAuth;