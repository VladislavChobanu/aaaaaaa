import React from 'react';
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  FormHelperText,
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';
import { StudentType } from '../../../types/StudentsType';
import { addStudentThunk } from '../../../redux/thunkActions/studentThunkActions';

export default function AddStudentForm(): JSX.Element | null {
  const groupId = useAppSelector((state) => state.group.selected?.id);
  const dispatch = useAppDispatch()
  const submitHandler = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as unknown as StudentType
    data.groupId = groupId
    

    void dispatch(addStudentThunk(data))
  }

  if (!groupId) return null;
  return (
    <Box as="form" onSubmit={submitHandler}>
      <FormControl>
        <FormLabel>Add student</FormLabel>
        <InputGroup size="md">
          <Input type="text" name="name" />
          <InputRightElement width="5.5rem">
            <Button h="1.75rem" size="sm" type="submit" color="cyan.600">
              submit
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText>Student was added to group.</FormHelperText>
      </FormControl>
    </Box>
  );
}
