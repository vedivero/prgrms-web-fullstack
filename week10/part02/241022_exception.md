## 예외 상황과 종류


### 예외의 원인

- 하드웨어, 디바이스 문제 (예: 네트워크 장애)

- 라이브러리 손상 또는 외부 종속성 문제

- 사용자 입력 실수

### 예외의 종류

#### 1 ECMAScript Error

자바스크립트 언어에서 발생하는 오류 유형.

- RangeError: 허용되지 않은 범위 사용 시 발생.

    ```
    new Array(-1); // RangeError: Invalid array length
    ```

- ReferenceError: 존재하지 않는 변수를 참조할 때 발생.

    ```
    console.log(x); // ReferenceError: x is not defined
    ```

- SyntaxError: 문법이 잘못된 경우 발생.

    ```
    const a = ; // SyntaxError: Unexpected token
    ```

- TypeError: 예상한 자료형이 아닐 때 발생.
    ```
    const a = 1;
    a(); // TypeError: a is not a function
    ```

#### DOMException

Web API 사용 시 발생하는 예외 유형.

- NetworkError : 네트워크 문제 발생 시.
- AbortError : 작업이 중단될 때.
- TimeoutError : 작업 시간이 초과되었을 때.

### 예외 처리의 필요성
예외 상황을 제대로 처리하지 않으면 프로그램이 멈출 수 있음.

try-catch 구문을 사용해 예외를 처리하여 안정성을 높임.