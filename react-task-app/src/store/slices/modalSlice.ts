import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types';

type TSetModalDataAction = {
   boardId: string;
   listId: string;
   task: ITask;
};

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
      setModalData: (state, action: PayloadAction<TSetModalDataAction>) => {
         state.boardId = action.payload.boardId;
         state.listId = action.payload.listId;
         state.task = action.payload.task;
      },
   },
});

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
