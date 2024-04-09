import { createAsyncThunk } from '@reduxjs/toolkit';
import type { GroupType } from '../../types/GroupType';
import groupService from '../../services/groupService';

export const fetchGroupActionThunk = createAsyncThunk<GroupType[]>('group/fetchGroups', async () =>
  groupService.getGroups()
);
