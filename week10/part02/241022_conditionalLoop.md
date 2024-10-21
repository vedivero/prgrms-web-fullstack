
## conditional loop


### 1. 시작할 때 조건을 평가하는 루프

루프가 시작되기 전에 조건을 평가.

조건이 참이면 루프가 실행되며, 반복마다 조건을 다시 평가.

자바스크립트의 while 루프와 for 루프가 여기에 해당.

    let i = 0;

    while (i < 3) {
        console.log(i);
        i++;
    }

### 2. 마지막에 조건을 평가하는 루프

루프를 한 번 실행한 후 조건을 평가.

조건이 참이면 다시 루프 실행.

    let i = 0;

    do {
    console.log(i);
    i++;
    } while (i < 3);

- while과 for: 시작할 때 조건 평가.
- do-while: 마지막에 조건 평가.
- 조건이 참일 동안 코드를 반복 실행.

### for loop

- C 언어에서 유래한 반복문 형식.
- while문과 다르게 루프와 관련된 변수를 루프 내부에서 직접 제어.
- 루프 변수의 비교와 증감을 위해 별도의 문법 명시 필요.
- 루프 변수를 활용해 명시적으로 카운트를 관리해야 함.

구조
    - 
    for (초기화; 조건식; 증감문) {
        ```
    }

    초기화 : 반복에 사용할 변수를 선언하고 초기화.
    조건식 ```: 반복을 계속할 조건을 명시. 조건이 참일 동안 반복.
    증감문 : 각 반복 후 변수의 값을 증가 또는 감소시킴.



### Collection loop (Foreach 루프) 설명

-  개념

    컬렉션 내의 항목들을 순회하기 위한 제어 흐름문.

    for문과 다르게 루프 변수(카운터)를 명시적으로 관리하지 않음.



### 자바스크립트의 Collection Loop (Foreach 루프)



1. for...of 문

    반복 가능한 객체(Array, Set, String 등)를 순회.

    각 반복에서 객체의 값을 반환.
     ```
    for (const 변수 of 객체) {
        ```
    }
    ```

    ```
    const f```oo = 'apple';

    for (const char of foo) {
        console.log(char);
    }
    //a
    //p
    //p
    //l
    //e
    ```


2. for...in 문

    객체의 **열거 가능한 속성(key)**을 순회.

    배열, 객체 등에서 속성의 이름을 반환.

    ```
    for (const 변수 in 객체) {
        ```
    }
    ```
    ```
    const f```oo = {
        apple: '🍎',
        banana: '🍌',
    };

    for (const key in foo) {
        console.log(key);
    }
    ```

    ```
    //apple
    //banana
    ```