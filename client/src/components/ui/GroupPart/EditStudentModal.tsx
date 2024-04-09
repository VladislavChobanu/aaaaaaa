import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';
import { editStudentThunk } from '../../../redux/thunkActions/studentThunkActions';
import { setCloseModal } from '../../../redux/slices/groupSlice';

export default function EditStudentModal(): JSX.Element {
  const editStudent = useAppSelector((state) => state.group.editStudent);
  const dispatch = useAppDispatch()


  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(editStudentThunk({ ...editStudent, name }));
    dispatch(setCloseModal);
  };
  const onClose = (): void => {
    dispatch(setCloseModal)
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit student</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={submitHandler}>
            <Stack spacing={3}>
              <Input value={input} onChange={changeHandler} name="name" />
              <FormControl>
                <FormLabel>Group</FormLabel>
                <Select
                  value={selectedGroup}
                  onChange={handleGroupChange}
                  name="group"
                  placeholder="Select group"
                >
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button colorScheme="blue" type="submit">
                Ok
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
