import React, { ChangeEvent, FC, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { addBoard } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch } from '../../../hooks/redux';
import { addLog } from '../../../store/slices/loggerSlice';

type SideFormProps = {
   inputRef: React.RefObject<HTMLInputElement>;
   setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: FC<SideFormProps> = ({ setIsFormOpen, inputRef }) => {
   const [inputText, setInputText] = useState(''); // 상태 관리
   const dispatch = useTypedDispatch(); // 컴포넌트 내부에서 훅 호출

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
   };

   const handleOnBlur = () => {
      setIsFormOpen(false); // 포커스 해제 시 폼 닫기
   };

   const handleClick = () => {
      if (inputText.trim() !== '') {
         // 빈 문자열이 아닌 경우만 처리
         dispatch(
            addBoard({
               board: { boardId: uuidv4(), boardName: inputText, lists: [] },
            }),
         );

         dispatch(
            addLog({
               logId: uuidv4(),
               logMessage: `게시판 등록: ${inputText}`,
               logAuthor: 'User',
               logTimestamp: String(Date.now()),
            }),
         );
         setInputText(''); // 입력 필드 초기화
         setIsFormOpen(false); // 폼 닫기
      }
   };

   return (
      <div>
         <input
            ref={inputRef} // 주석 해제하여 Ref 사용 가능
            autoFocus
            type='text'
            placeholder='새로운 게시판 등록하기'
            value={inputText} // 상태와 입력 값 동기화
            onChange={handleChange}
            onBlur={handleOnBlur}
         />
         <button onClick={() => setIsFormOpen(false)}>닫기</button>
         <FiCheck onMouseDown={handleClick} />
      </div>
   );
};

export default SideForm;
