import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

type TBoardsState = {
   modalActive: boolean;
   boardArray: IBoard[];
};

const initialState: TBoardsState = {
   modalActive: false,
   boardArray: [
      {
         boardId: 'board-0',
         boardName: '첫 번째 게시물',
         lists: [
            {
               listId: 'list-0',
               listName: 'List 1',
               tasks: [
                  {
                     taskId: 'task-0',
                     taskName: 'Task 1',
                     taskDescription: 'description',
                     taskOwner: 'vedivero',
                  },
                  {
                     taskId: 'task-1',
                     taskName: 'Task 2',
                     taskDescription: 'description',
                     taskOwner: 'vedivero',
                  },
               ],
            },
            {
               listId: 'list-1',
               listName: 'List 2',
               tasks: [
                  {
                     taskId: 'task-0',
                     taskName: 'Task 1',
                     taskDescription: 'description',
                     taskOwner: 'vedivero',
                  },
                  {
                     taskId: 'task-1',
                     taskName: 'Task 2',
                     taskDescription: 'description',
                     taskOwner: 'vedivero',
                  },
               ],
            },
         ],
      },
   ],
};

const boardsSlice = createSlice({
   name: 'boards', //이름
   initialState, //초기 state
   reducers: {
      //액션을 생성하는 함수들
   },
});

export const boardsReducer = boardsSlice.reducer;
