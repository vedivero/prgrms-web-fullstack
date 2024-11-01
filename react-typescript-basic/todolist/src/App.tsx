import './App.css';
import TodoList from './Todolist';
import Clock from './Timer';
import MyWeather from './MyWeather';

function App() {
   return (
      <div className='container'>
         <TodoList />
         <Clock />
         <MyWeather weather='rainy'>abc</MyWeather>
      </div>
   );
}

export default App;
