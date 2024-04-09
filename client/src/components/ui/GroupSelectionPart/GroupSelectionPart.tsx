import { Box, Stack } from '@chakra-ui/react';
import React from 'react';
import GroupSelect from './GroupSelect';
import AddStudentForm from './AddStudentForm';

export default function GroupSelectionPart(): JSX.Element {
  return (
    <Box rounded="lg" p={4} boxShadow="2xl">
      <Stack spacing={4}>
        <GroupSelect />
        <AddStudentForm />
      </Stack>
    </Box>
  );
}
