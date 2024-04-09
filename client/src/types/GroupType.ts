import type { StudentType } from './StudentsType';

export type GroupType = {
  id: number;
  name: string;
  img: string;
};

export type GroupUnitialStateType = {
  groups: GroupType[];
  selected: GroupType | null;
  students: StudentType[] | null;
  studentsLoading: boolean;
  editStudent: StudentType | null;
  isLoading: boolean;
  favorites: StudentType[]
};
