import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IList, ITask } from '../../types';

type TBoardsState = {
   modalActive: boolean;
   boardArray: IBoard[];
};

type TAddBoardAction = {
   board: IBoard;
};

type TDeleteBoardAction = {
   boardId: string;
   listId: string;
};

type TAddListAction = {
   boardId: string;
   list: IList;
};
type TAddTaskAction = {
   boardId: string;
   listId: string;
   task: ITask;
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
      {
         boardId: 'board-1',
         boardName: '두 번째 게시물',
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
   name: 'boards',
   initialState,
   reducers: {
      addBoard: (state, action: PayloadAction<TAddBoardAction>) => {
         state.boardArray.push(action.payload.board);
      },
      addList: (state, action: PayloadAction<TAddListAction>) => {
         state.boardArray = state.boardArray.map((board) =>
            board.boardId === action.payload.boardId
               ? { ...board, lists: [...board.lists, action.payload.list] }
               : board,
         );
      },

      addTask: (state, action: PayloadAction<TAddTaskAction>) => {
         state.boardArray = state.boardArray.map((board) =>
            board.boardId === action.payload.boardId
               ? {
                    ...board,
                    lists: board.lists.map((list) =>
                       list.listId === action.payload.listId
                          ? { ...list, tasks: [...list.tasks, action.payload.task] }
                          : list,
                    ),
                 }
               : board,
         );
      },

      deleteList: (state, action: PayloadAction<TDeleteBoardAction>) => {
         state.boardArray = state.boardArray.map((board) =>
            board.boardId === action.payload.boardId
               ? {
                    ...board,
                    lists: board.lists.filter((list) => list.listId !== action.payload.listId),
                 }
               : board,
         );
      },
      setModalActive: (state, action: PayloadAction<boolean>) => {
         state.modalActive = action.payload;
      },
   },
});

export const { addBoard, deleteList, setModalActive, addList, addTask } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
