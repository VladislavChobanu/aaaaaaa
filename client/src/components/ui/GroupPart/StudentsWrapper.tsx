import { Box, Skeleton, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import StudentItem from './StudentItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';
import { fetchStudentsThunk } from '../../../redux/thunkActions/studentThunkActions';
import EditStudentModal from './EditStudentModal';

type StudentsWrapperProps = {
  groupId: number;
};

export default function StudentsWrapper({ groupId }: StudentsWrapperProps): JSX.Element {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.group.students);
  const studentLoading = useAppSelector((state) => state.group.studentsLoading);
  const editStudent = useAppSelector((state) => state.group.editStudent);

  useEffect(() => {
    void dispatch(fetchStudentsThunk(groupId));
  }, [groupId]);

  if (studentLoading) {
    return (
      <VStack className="mt-5" gap={2} mt={3} p={4} spacing="2px" align="stretch">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height="50px" rounded="md" />
          ))}
      </VStack>
    );
  }

  return (
    <>
      <Box mt={3} p={4} maxH="400px">
        {students?.map((student, index) => (
          <StudentItem key={student.id} index={index} student={student} />
        ))}
      </Box>
      {editStudent && <EditStudentModal />}
    </>
  );
}
