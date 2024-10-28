import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types';

type TModalState = {
   boardId: string;
   listId: string;
   task: ITask;
};

const initialState: TModalState = {
   boardId: 'board-0',
   listId: 'list-0',
   task: {
      taskId: 'task-0',
      taskName: 'task 0',
      taskDescription: 'task description',
      taskOwner: 'vedviero',
   },
};

const modalSlice = createSlice({
   name: 'modal', //이름
   initialState, //초기 state
   reducers: {
      //액션을 생성하는 함수들
   },
});

export const modalReducer = modalSlice.reducer;
