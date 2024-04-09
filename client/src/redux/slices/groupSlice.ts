import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { GroupUnitialStateType } from '../../types/GroupType';
import { fetchGroupActionThunk } from '../thunkActions/groupThunkActions';
import { addStudentThunk, deleteStudentThunk, editStudentThunk, fetchStudentsThunk } from '../thunkActions/studentThunkActions';
import FavoritesPage from '../../components/pages/FavoritesPage';

const initialState: GroupUnitialStateType = {
  groups: [],
  selected: null,
  students: null,
  studentsLoading: false,
  editStudent: null,
  isLoading: false,
  favorites: [],
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setSelectedGroup: (state, action: PayloadAction<number>) => {
      const group = state.groups.find((el) => el.id === action.payload);
      if (group) {
        state.selected = group;
      }
    },
    setOpenModal: (state, action) => {
      state.editStudent = action.payload
    },
    setCloseModal: (state) => {
      state.editStudent = null
    },
    addFavorite: (state, action) => {
      state.favorites.unshift(action.payload)
    },
    deleteFavorite: (state, action) => {
      state.favorites.filter((el) => el.id !== action.payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGroupActionThunk.pending, (state) => {
    state.isLoading = true;
    }
    )
    builder.addCase(fetchGroupActionThunk.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false
    });

    builder.addCase(fetchStudentsThunk.fulfilled, (state, action) => {
      state.students = action.payload;
      state.studentsLoading = false;
    });

    builder.addCase(fetchStudentsThunk.pending, (state) => {
      state.studentsLoading = true;
    });


      builder.addCase(deleteStudentThunk.fulfilled, (state, action) => {
          state.students = state.students?.filter((el) => el.id !== action.payload)
      })
      builder.addCase(addStudentThunk.fulfilled, (state, action) => {
        state.students.unshift(action.payload)
    })
      builder.addCase(editStudentThunk.fulfilled, (state, action) => {
        state.students?.map((el) => el.id === action.payload.id ? action.payload : el)
        state.editStudent = null
      })
  },
});

export const { setSelectedGroup, addFavorite, deleteFavorite, setOpenModal, setCloseModal } = groupSlice.actions;
export default groupSlice.reducer;
