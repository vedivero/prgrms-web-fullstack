import { createSlice } from '@reduxjs/toolkit';
import { ILogItem } from '../../types';

type loggerState = {
   logArray: ILogItem[];
};

const initialState: loggerState = {
   logArray: [],
};

const loggerSlice = createSlice({
   name: 'logger', //이름
   initialState, //초기 state
   reducers: {
      //액션을 생성하는 함수들
   },
});

export const loggerReducer = loggerSlice.reducer;
