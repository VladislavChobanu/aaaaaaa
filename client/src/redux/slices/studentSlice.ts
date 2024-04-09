import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StudentType } from '../../types/StudentsType';
import { deleteStudentThunk } from '../thunkActions/studentThunkActions';

const initialState: StudentType = {
    id: 0,
    groupId: null,
    name: ''
}

export const studentSlice = {
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(deleteStudentThunk.fulfilled, (state, action) => {
            state.
        })
    }
}