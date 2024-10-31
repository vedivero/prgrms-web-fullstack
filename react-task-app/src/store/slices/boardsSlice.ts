import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IList, ITask } from '../../types';

type TBoardsState = {
   modalActive: boolean;
   boardArray: IBoard[];
};

type TAddBoardAction = {
   board: IBoard;
};

type TDeleteListAction = {
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

type TDeleteTaskAction = {
   boardId: string;
   listId: string;
   taskId: string;
};

type TDeleteBoardAction = {
   boardId: string;
};

type TSortAction = {
   boardIndex: number;
   droppableIdStart: string;
   droppableIdEnd: string;
   droppableIndexStart: number;
   droppableIndexEnd: number;
   droppableId: string;
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
            // {
            //    listId: 'list-1',
            //    listName: 'List 2',
            //    tasks: [
            //       {
            //          taskId: 'task-0',
            //          taskName: 'Task 1',
            //          taskDescription: 'description',
            //          taskOwner: 'vedivero',
            //       },
            //       {
            //          taskId: 'task-1',
            //          taskName: 'Task 2',
            //          taskDescription: 'description',
            //          taskOwner: 'vedivero',
            //       },
            //    ],
            // },
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
      deleteBoard: (state, action: PayloadAction<TDeleteBoardAction>) => {
         state.boardArray = state.boardArray.filter((board) => board.boardId !== action.payload.boardId);
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

      updateTask: (state, action: PayloadAction<TAddTaskAction>) => {
         state.boardArray = state.boardArray.map((board) =>
            board.boardId === action.payload.boardId
               ? {
                    ...board,
                    lists: board.lists.map((list) =>
                       list.listId === action.payload.listId
                          ? {
                               ...list,
                               tasks: list.tasks.map((task) =>
                                  task.taskId === action.payload.task.taskId ? action.payload.task : task,
                               ),
                            }
                          : list,
                    ),
                 }
               : board,
         );
      },

      deleteTask: (state, action: PayloadAction<TDeleteTaskAction>) => {
         state.boardArray = state.boardArray.map((board) =>
            board.boardId === action.payload.boardId
               ? {
                    ...board,
                    lists: board.lists.map((list) =>
                       list.listId === action.payload.listId
                          ? {
                               ...list,
                               tasks: list.tasks.filter((task) => task.taskId !== action.payload.taskId),
                            }
                          : list,
                    ),
                 }
               : board,
         );
      },
      deleteList: (state, action: PayloadAction<TDeleteListAction>) => {
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
      sort: (state, action: PayloadAction<TSortAction>) => {
         if (action.payload.droppableIdStart === action.payload.droppableIdEnd) {
            const list = state.boardArray[action.payload.boardIndex].lists.find(
               (list) => list.listId === action.payload.droppableIdStart,
            );
            const card = list?.tasks.splice(action.payload.droppableIndexStart, 1);
            list?.tasks.splice(action.payload.droppableIndexEnd, 0, ...card!);
         }

         if (action.payload.droppableIdStart === action.payload.droppableIdEnd) {
            const listStart = state.boardArray[action.payload.boardIndex].lists.find(
               (list) => list.listId === action.payload.droppableIdStart,
            );
            const card = listStart!.tasks.splice(action.payload.droppableIndexStart, 1);
            const listEnd = state.boardArray[action.payload.boardIndex].lists.find(
               (list) => list.listId === action.payload.droppableIdEnd,
            );
            listEnd?.tasks.splice(action.payload.droppableIndexEnd, 0, ...card);
         }
      },
   },
});

export const {
   sort,
   addBoard,
   deleteBoard,
   deleteList,
   setModalActive,
   addList,
   addTask,
   updateTask,
   deleteTask,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
