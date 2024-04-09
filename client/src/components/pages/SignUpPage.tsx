import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../hooks/useReduxHook';
import { signUpThunk } from '../../redux/thunkActions/authThunkActions';
import { openModalWithError } from '../../redux/slices/modalSlice';
import { UserSignUpType } from '../../types/authType';

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;
    console.log('222');

    void dispatch(signUpThunk(formData))
      .unwrap()
      .catch(() => {
        console.log('111');
        void dispatch(openModalWithError('Ошибка регистрации! Проверьте данные и повторите попытку'));
      });
  };
  return (
    <Flex justify="center">
      <Box bg={useColorModeValue('', 'gray.900')} w="lg" p={8} borderRadius="md">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          align="center"
          mb={4}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          Sign Up
        </Text>

        <form onSubmit={submitHandler}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Name</FormLabel>
              <Input
                placeholder="Name"
                name="username"
                bg={useColorModeValue('gray.100', 'gray.900')}
                color={useColorModeValue('current', 'white')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                bg={useColorModeValue('gray.100', 'gray.900')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                bg={useColorModeValue('gray.100', 'gray.900')}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" w="full" mt={4}>
              Create Account
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
