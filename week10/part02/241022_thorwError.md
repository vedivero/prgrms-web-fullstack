# 2024.10.22 / week 10 / part.02

## thorw, error객체

### throw문
예외를 발생시키기 위해 사용.

catch 블록에서 에러 객체를 처리.

throw문 이후의 코드는 실행되지 않음.

#### 예외 발생 시 흐름
현재 함수의 실행이 즉시 중지.

에러 객체와 함께 예외가 throw.

catch 블록이 있을 경우 catch로 전달. (catch 블록이 없으면 프로그램 종료.)

```
const foo = () => {
  console.log(1);
  throw '여기!';
  console.log(2); // 실행되지 않음
};

foo();
```

### Error 객체

사용자가 직접 Error 객체를 생성하여 사용 가능.

new Error() 생성자를 통해 에러 메시지 정의.

Error 객체의 message와 name 속성을 설정 가능.

```
const foo = () => {
  console.log(1);
  const customError = new Error();
  customError.name = 'ErrorName';
  customError.message = '에러 발생';
  
  throw customError;
  console.log(2); // 실행되지 않음
};

foo();
```

- Error.message : 에러에 대한 메시지.

- Error.name : 에러의 이름 지정.

> ECMAScript 표준에서 다양한 내장 에러 유형 제공.

## try...catch문과 예외 처리


### 1. 콜 스택 (Call Stack)과 예외 처리

- 스택 자료구조: FILO (First In, Last Out) 구조로, 마지막에 추가된 것이 먼저 제거됨.

- 함수가 호출될 때마다 스택에 추가(push).

- 함수가 종료되면 스택에서 제거(pop).

- 예외 발생 시: 스택을 따라 올라가면서 해당하는 catch문이 있는지 탐색.

    - catch문이 없으면 프로그램 종료.
    
    - catch문이 있으면 그곳에서 예외 처리.


### 2. try...catch문
- 예외 처리를 위해 사용하는 구문.
- try 블록에서 발생한 예외를 catch 블록에서 처리.
- 예외가 발생하지 않으면 catch 블록은 실행되지 않음.

구조
```
try {
        
} catch (error) {
    
}
```

```
try {
    const result = JSON.parse("{ invalid json }");
} catch (error) {
    console.log("에러 발생:", error.message);
}
```

### 3. finally 블록
- finally는 예외 발생 여부와 상관없이 항상 실행됨.
- 자원 정리나 마무리 작업에 유용.

```
try {
    console.log("시작");
    throw new Error("예외 발생");
} catch (error) {
        - console.log("에러 처리:", error.message);
} finally {
    
}
```

### 4. 예외 처리 사례
- 네트워크 오류 처리: 서버와의 통신이 실패할 때.
- 비즈니스 로직 처리: 유효하지 않은 데이터가 들어올 때.
- 사용자 입력 오류 처리: 잘못된 형식의 입력이 들어올 때.