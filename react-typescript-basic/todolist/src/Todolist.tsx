import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TodoModal from './TodoModal';

// FC = function component
const TodoList: React.FC = () => {
   type Todo = {
      id: number;
      text: string;
      isChecked: boolean;
   };

   const [todos, setTodos] = useState<Todo[]>([
      { id: 1, text: '공부하기', isChecked: false },
      { id: 2, text: '운동하기', isChecked: false },
      { id: 3, text: '청소하기', isChecked: false },
   ]);

   const [showDetail, setShowDetail] = useState<boolean>(false);
   const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

   const [newTodo, setNewTodo] = useState<string>('');

   const handleCheckedChange = (itemId: number) => {
      setTodos((prevItems) =>
         prevItems.map((item) => (item.id === itemId ? { ...item, isChecked: !item.isChecked } : item)),
      );
   };

   const addTodo = () => {
      if (newTodo.trim() !== '') {
         setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
         setNewTodo('');
      }
   };

   const removeTodo = (id: number) => {
      setTodos(todos.filter((todo) => id !== todo.id));
   };

   const handleTodoClick = (todo: Todo) => {
      setShowDetail(true);
      setSelectedTodo(todo);
   };

   const handleCloseDetail = () => {
      setShowDetail(false);
   };

   const title: string = '오늘 할 일';

   return (
      <div>
         <h1>{title}</h1>
         <div className='App-header'>
            <div>
               <input
                  type='text'
                  placeholder='할 일 입력'
                  value={newTodo} // value 추가
                  onChange={(e) => setNewTodo(e.target.value)} // onChange 핸들러 추가
                  style={{ marginRight: '30px', writingMode: 'horizontal-tb' }}
               />
               <Button variant='primary' onClick={addTodo}>
                  추가
               </Button>
            </div>
            <br />
            <div className='board'>
               <ul>
                  {todos.map((todo) => (
                     <li key={todo.id}>
                        <input
                           type='checkbox'
                           checked={todo.isChecked}
                           onChange={() => handleCheckedChange(todo.id)}
                        />
                        <span onClick={() => handleTodoClick(todo)}>
                           {todo.isChecked ? <del>{todo.text}</del> : <span>{todo.text}</span>}
                        </span>

                        <Button
                           variant='danger'
                           onClick={() => {
                              removeTodo(todo.id);
                           }}
                        >
                           삭제
                        </Button>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         <TodoModal show={showDetail} todo={selectedTodo} handleClose={handleCloseDetail}></TodoModal>
      </div>
   );
};

export default TodoList;
