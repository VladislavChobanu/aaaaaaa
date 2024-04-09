import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import GroupSelectionPart from '../ui/GroupSelectionPart/GroupSelectionPart';
import GroupPart from '../ui/GroupPart/GroupPart';

export default function MainPage(): JSX.Element {
  return (
    <Box mt={10}>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={2}>
        <GroupSelectionPart />
        <GroupPart />
      </SimpleGrid>
    </Box>
  );
}
