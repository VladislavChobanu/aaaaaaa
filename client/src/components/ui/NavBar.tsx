import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHook';
import { logOutThunk } from '../../redux/thunkActions/authThunkActions';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    void dispatch(logOutThunk());
  };
  return (
    <Box bg={useColorModeValue('gray.200', 'gray.900')} rounded="lg" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={6}>
          <Box>Hi, {user.status === 'logged' ? user.username : 'guest'}</Box>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            groups
          </NavLink>
          { user.status != "guest" && (
          <NavLink to="/favorite" className={({ isActive }) => (isActive ? 'active' : '')}>
            favorite
          </NavLink>
          )
        }
        </HStack>
        <HStack spacing={6}>
          {user.status !== 'logged' ? (
            <>
              <NavLink to="signin" className={({ isActive }) => (isActive ? 'active' : '')}>
                signin
              </NavLink>
              <NavLink to="signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                signup
              </NavLink>
            </>
          ) : (
            <Button onClick={logoutHandler}>Выйти</Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
