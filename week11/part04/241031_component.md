
# 클래스형 컴포넌트와 함수형 컴포넌트


## 1. 함수형 컴포넌트 (Functional Component)

- 정의: 자바스크립트 함수로 컴포넌트를 정의.
- 장점: 코드가 간결하고 직관적, 리액트 훅(Hooks) 사용 가능.
- 사용 예시:

    ```
    function FuncComponent() {
        return <div>함수형 컴포넌트</div>;
    }
    export default FuncComponent;
    ```

## 2. 클래스형 컴포넌트 (Class Component)

- 정의: 클래스 문법을 사용해 리액트 컴포넌트를 정의.
- 특징: state와 라이프사이클 메서드(componentDidMount 등)를 직접 사용.
- 사용 예시:

    ```
    import { Component, ReactNode } from 'react';

    class ClassComponent extends Component {
        render(): ReactNode {
            return <div>클래스형 컴포넌트</div>;
        }
    }
    
    export default ClassComponent;
    ```

## 주요 차이점
- 함수형 컴포넌트는 단순하고, 성능이 더 효율적.

- 클래스형 컴포넌트는 복잡한 로직과 라이프사이클 메서드를 활용할 때 유용하지만, 현재는 함수형 컴포넌트와 Hooks가 대세.

>최신 프로젝트에서는 함수형 컴포넌트와 Hooks 조합을 더 많이 사용


<br>
<br>

# state 사용

```
import { useState } from 'react';

const TodoList: React.FC = () => {
   // 해당 값이 바인딩되면, 페이지를 리렌더링함
   const [todos] = useState('공부하기');
   const [todos1] = useState('운동하기');
   const [todos2] = useState('청소하기');

   const title: string = '오늘 할 일';  // FC = function component
   return (
      <div>
         <h1>{title}</h1>
         <p>
            <div className='App-header'>
               <ul>
                  <li>{todos}</li>
                  <li>{todos1}</li>
                  <li>{todos2}</li>
               </ul>
            </div>
         </p>
      </div>
   );
};

export default TodoList;
```


>문제점: 할 일이 추가될 때마다 변수를 하나씩 만들어야 하므로 비효율적.

<br>

### 배열 사용 (요소가 출력되지 않는 문제 발생):

```
import { useState } from 'react';

const TodoList: React.FC = () => {
   const [todos] = useState(['공부하기', '운동하기', '청소하기']);  // 배열로 저장

   const title: string = '오늘 할 일';  
   return (
      <div>
         <h1>{title}</h1>
         <p>
            <div className='App-header'>
               <ul>
                  <li>{todos}</li>  {/* 배열 자체가 출력됨 */}
               </ul>
            </div>
         </p>
      </div>
   );
};

export default TodoList;
```

<br>

### 문제점: 배열을 직접 `<li>`에 넣으면 배열 전체가 하나의 요소로 출력

배열에서 개별 요소 출력 (정상 동작):

```
import { useState } from 'react';

const TodoList: React.FC = () => {
   const [todos, setTodos] = useState<string[]>(['공부하기', '운동하기', '청소하기']);

   const title: string = '오늘 할 일';  
   return (
      <div>
         <h1>{title}</h1>
         <p>
            <div className='App-header'>
               <ul>
                  <li>{todos[0]}</li>
                  <li>{todos[1]}</li>
                  <li>{todos[2]}</li>
               </ul>
            </div>
         </p>
      </div>
   );
};

export default TodoList;
```

정상 동작: 배열에서 각 요소를 인덱스로 접근해 출력하면 문제가 해결됩니다.

<br>

# 구조 분해 할당의 예시:

## 예시 1: 배열 구조 분해 할당

```
const colors = ['red', 'green', 'blue'];
const [r, g, b] = colors;
console.log(r, g, b);  // red green blue
```

## 예시 2: 객체 구조 분해 할당

```
const person = {
   name: 'Lee',
   age: 20,
   city: 'Seoul'
};

const { name, age, city } = person;
console.log(name, age, city);  // Lee 20 Seoul
```


<br>

#  스프레드 연산자와 메모리


## 1. 메모리와 복사 방식

- 얕은 복사 (Shallow Copy): 복사된 객체가 원래 객체의 참조를 공유
- 깊은 복사 (Deep Copy): 새로운 메모리를 할당해 완전히 새로운 객체를 생성

## 2. 예시
- 예시 1: 얕은 복사

    ```
    let a = [1, 2, 3];
    let b = a;
    console.log(a === b);  // true: 같은 참조를 공유 (얕은 복사)
    ```

- 배열 b는 a와 같은 메모리 주소를 공유하기 때문에, a가 변경되면 b도 함께 변경

## 예시 2: 깊은 복사 (스프레드 연산자 사용)

- 스프레드 연산자를 사용하면 새로운 배열이 생성되며, 원본 배열과 독립적으로 동작
    ```
    let c = [...a];
    console.log(a === c);  // false: 새로운 메모리를 할당한 복사 (깊은 복사)
    ```


## TodoList 코드에서 스프레드 연산자의 활용

- 기존 todos 배열을 스프레드 연산자로 복사하고, 새로운 할 일을 추가
- 이렇게 하면 새로운 메모리에 배열이 생성되어 React가 변경 사항을 감지하고 리렌더링
    ```
    setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
    ```


## 정리
- 얕은 복사: 같은 메모리 주소를 참조.
- 깊은 복사: 새로운 메모리를 생성.
- 스프레드 연산자를 사용해 배열이나 객체를 복사하면 깊은 복사가 일어나므로, React 컴포넌트의 상태 업데이트에서 유용하게 사용