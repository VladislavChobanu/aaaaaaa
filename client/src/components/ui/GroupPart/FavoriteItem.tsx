import React from 'react'
import { StudentType } from '../../../types/StudentsType';
import { Box, Button, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import deleteFavorite from '../../../redux/slices/groupSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';

type Props = {
    index: number;
    student: StudentType;
}

const handleDelete = (id:number):void => {
  void dispatch(deleteFavorite(id))
}

export default function FavoriteItem({index, student}: Props) {
  
const dispatch = useAppDispatch();

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
              <Button variant="outline" color="red.500" onClick={() => handleDelete(student.id)}>
                delete
              </Button>
            </HStack>
          </Box>
          )
    }
        </Box>
      );
}