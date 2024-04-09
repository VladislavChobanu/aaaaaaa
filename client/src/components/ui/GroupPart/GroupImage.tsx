import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import type { GroupType } from '../../../types/GroupType';

type GroupImageProps = {
  group: GroupType;
};

export default function GroupImage({ group }: GroupImageProps): JSX.Element {
  return (
    <Flex justify="space-between">
      <Text fontSize="2xl">{group.name}</Text>
      <Image
        rounded="xl"
        height={150}
        width={150}
        objectFit="cover"
        src={`http://localhost:3001/img/${group.img}`}
      />
    </Flex>
  );
}
