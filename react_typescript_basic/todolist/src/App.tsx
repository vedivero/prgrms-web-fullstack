import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
   let title = 'React';
   let contest = 'Nice to meet you';

   return (
      <div className='App-header'>
         {title === 'React' ? <h1>Hello, React</h1> : 'Hello!'}
         <p>{contest}</p>
         {/* 주석문 작성 방법 */}
         {/* 협업 시 주석문 작성하는 요령 */}
         {/* 
          작성자(author)
          작성일(2024.10.30)
          내용(react basic)
         */}
      </div>
   );
}

// 기존 javascript 문법 <> jsx
// function App(){
//   return React.createElement("div",null,"Hello, Reat",React.createElement("p",null,"반갑습니다."));
// }

export default App;
