
# 객체 리터럴

## 1. 리터럴 타입이란?
- 리터럴 타입은 정확한 값을 나타내는 타입

- 타입스크립트(TypeScript)에서는 리터럴 타입을 활용해 변수가 가질 수 있는 값을 명확하게 제한

- 이는 코드의 가독성과 유효성 검사에 큰 도움

## 2. 리터럴 타입의 종류

- 문자열 리터럴 타입

    ```
    let status: 'success' | 'error';
    status = 'success'; // 유효
    status = 'pending'; // 오류: 'pending'은 허용되지 않음
    ```
    - 'success' 또는 'error'만 가능

- 숫자 리터럴 타입

    ```
    let speed: 50 | 100 | 200;
    speed = 100; // 유효
    speed = 150; // 오류: 150은 허용되지 않음
    ```
    - 50, 100, 200 중 하나만 가능


- 불리언 리터럴 타입
    ```
    let isTrue: true;
    isTrue = true; // 유효
    isTrue = false; // 오류: false는 허용되지 않음
    ```
    - true만 허용

- 객체 리터럴 타입
    ```
    let person: { name: 'John'; age: 30 };
    person = { name: 'John', age: 30 }; // 유효
    person = { name: 'Alice', age: 25 }; // 오류: 값이 일치해야 함
    ```
    - 객체의 값과 구조가 정확히 일치해야 함

## 3. 타입 별칭
- 리터럴 타입을 간결하고 재사용 가능하게 정의

    ```
    type CardinalDirection = 'North' | 'East' | 'South' | 'West';
    let direction: CardinalDirection;

    direction = 'North'; // 유효
    direction = 'Northeast'; // 오류: 'Northeast'는 허용되지 않음
    ```

## 4. 리터럴 타입의 장점

- 코드의 가독성 향상
- 잘못된 값이 들어오는 것을 방지

<br>
<br>
