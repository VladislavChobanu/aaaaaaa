import { Box } from '@chakra-ui/react';
import React from 'react';
import GroupImage from './GroupImage';
import StudentsWrapper from './StudentsWrapper';
import { useAppSelector } from '../../../hooks/useReduxHook';

export default function GroupPart(): JSX.Element {
  const selectedGroup = useAppSelector((state) => state.group.selected);
  return (
    <Box p={4} boxShadow="2xl">
      {selectedGroup && (
        <>
          <GroupImage group={selectedGroup} />
          <StudentsWrapper groupId={selectedGroup.id} />
        </>
      )}
    </Box>
  );
}
