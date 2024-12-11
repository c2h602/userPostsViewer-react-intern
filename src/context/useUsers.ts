import { useContext } from 'react';
import { UsersContext } from './UsersContextProvider';

export const useUsers = () => useContext(UsersContext);