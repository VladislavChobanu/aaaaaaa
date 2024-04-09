import React from 'react';
import { Box, Button, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import type { StudentType } from '../../../types/StudentsType';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';
import { deleteStudentThunk } from '../../../redux/thunkActions/studentThunkActions';
import { addFavorite } from '../../../redux/slices/groupSlice';

type StudentItemProps = {
  student: StudentType;
  index: number;
};

export default function StudentItem({ student, index }: StudentItemProps): JSX.Element {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      rounded="md"
      alignItems="center"
      transition="all .3s ease"
      _hover={{
        backgroundColor: useColorModeValue('gray.100', 'gray.600'),
      }}
    >
      <Text>{index + 1}</Text>
      <Text>{student.name}</Text>
      { user.status != "guest" && (
      <Box>
        <HStack>
          <Button variant="outline" color="orange.500" onClick={() => void dispatch(addFavorite(student))}>
            favorite
          </Button>
          <Button variant="outline" color="blue.500">
            edit
          </Button>
          <Button variant="outline" color="red.500" onClick={() => void dispatch(deleteStudentThunk(student.id))}>
            delete
          </Button>
        </HStack>
      </Box>
      )
}
    </Box>
  );
}
