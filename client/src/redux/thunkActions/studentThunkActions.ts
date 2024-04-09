import { createAsyncThunk } from '@reduxjs/toolkit';
import studentService from '../../services/studentService';
import type { StudentType } from '../../types/StudentsType';

export const fetchStudentsThunk = createAsyncThunk<StudentType[], number>(
  'students/fetchStudents',
  async (id) => studentService.getStudents(id),
);

export const deleteStudentThunk = createAsyncThunk(
  'students/deleteStudent',
  async (id: StudentType['id']) => {
    await studentService.deleteStudent(id);
    return id;
  },
);

export const addStudentThunk = createAsyncThunk(
  'students/addStudent',
  async (data: StudentType) => {
    const result = await studentService.addStudent(data);
    return result;
  },
);

export const editStudentThunk = createAsyncThunk(
  'students/editStudent',
  async (data: StudentType) => {
    const result = await studentService.updateStudent(data);
    return result;
  },
);

