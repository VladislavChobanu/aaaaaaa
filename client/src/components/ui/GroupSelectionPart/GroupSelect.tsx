import React, { useEffect } from 'react';
import { FormControl, FormLabel, Box, Select } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';
import { fetchGroupActionThunk } from '../../../redux/thunkActions/groupThunkActions';
import { setSelectedGroup } from '../../../redux/slices/groupSlice';

export default function GroupSelect(): JSX.Element {
  const dispatch = useAppDispatch();
  const {groups} = useAppSelector((state) => state.group);
  console.log(groups)

  useEffect(() => {
    void dispatch(fetchGroupActionThunk());
  }, []);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setSelectedGroup(Number(e.target.value)));
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Group</FormLabel>
        <Select onChange={handleGroupChange} name="group" placeholder="Select group">
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
