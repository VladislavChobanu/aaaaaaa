import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../hooks/useReduxHook';
import FavoriteItem from '../ui/GroupPart/FavoriteItem';

export default function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector((state) => state.group.favorites)
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
          Favorite
        </Text>
        {favorites?.map((student, index) => (
          <FavoriteItem key={student.id} index={index} student={student} />
        ))}
      </Box>
    </Flex>
  );
}
