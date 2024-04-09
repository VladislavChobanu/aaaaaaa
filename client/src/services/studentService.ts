import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './apiInstance';
import type { StudentType } from '../types/StudentsType';

class StudentService {
  constructor(private readonly api: AxiosInstance) {}

  public getStudents(id: number): Promise<StudentType[]> {
    return this.api.get<Promise<StudentType[]>>(`/student/group/${id}`).then(
      (res) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(res.data);
          }, 1500);
        }),
    );
  }

  public deleteStudent(id: StudentType['id']): Promise<AxiosResponse> {
    return this.api.delete<void>(`/student/${id}`);
  }

  public addStudent(student: Omit<StudentType, 'id'>): Promise<StudentType> {
    return this.api.post<StudentType>('/student', student).then((res) => res.data);
  }

  public updateStudent(student: StudentType): Promise<StudentType> {
    return this.api.put<StudentType>(`/student/${student.id}`, student).then((res) => res.data);
  }
}

export default new StudentService(axiosInstance);
