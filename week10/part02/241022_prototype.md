
## 객체(Object)란?

### 현실의 개념을 추상화한 상태, 속성, 행동을 가진 단위.
-  상태: this로 참조.
- 속성: 객체의 고유 데이터.
- 메서드: 객체가 수행하는 행동.

### 인스턴스 객체

- 클래스나 함수로부터 생성된 객체를 의미.
- 객체 지향 프로그래밍(OOP): 객체 간 상호작용으로 프로그램을 구성하는 방식.

### 대표적인 객체 지향 프로그래밍

- 클래스 기반 OOP: Java, C++ 등에서 사용.
- 프로토타입 기반 OOP: JavaScript에서 사용.

### 프로토타입 객체

- 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지고 있음.
- ` __proto__`를 통해 부모 객체에 접근 가능.
- 부모 객체의 속성과 메서드를 상속받아 사용.

```
const person = { name: 'joy', age: 28 };
console.dir(person.__proto__); // Object의 프로토타입
```

### 프로토타입 객체의 생성

- 함수형 객체만 prototype 필드를 가짐.
- 생성자 함수를 통해 인스턴스를 생성:

```
function Person() {}
Person.prototype.age = 28;

const joy = new Person();
console.log(joy.age); // 28
```

- new 키워드로 호출 시 생성자의 prototype이 인스턴스의 부모 객체로 설정됨.


### 생성자 함수의 특징

- 대문자로 시작하는 함수명 사용 (관례).
- new 키워드와 함께 호출하여 인스턴스를 생성.
- constructor: 생성된 객체를 참조.

```
function Person() {}
const joy = new Person();
console.log(joy.__proto__ === Person.prototype); // true
```


## 프로토타입 체인 (Prototype Chain) 정리

### 프로토타입 체인의 동작 원리

- 객체에서 속성을 찾을 때 해당 객체에 없는 경우, 프로토타입 체인을 따라 부모 객체를 탐색함.
- 모든 객체는 [[Prototype]] 슬롯을 통해 부모 객체(프로토타입)와 연결됨.
- 최종적으로 모든 객체는 **Object.prototype**을 상속받으며, 여기서 체인이 종료됨.

### 속성 탐색 과정

- 객체에 요청한 속성이 없을 경우 **__proto__**를 통해 부모 객체를 탐색.
- 예를 들어, foo.toString() 호출 시:
    - foo 객체에 toString()이 없으면,
    - 부모 객체인 **Object.prototype**에서 탐색.
    - 여기서 toString() 메서드를 찾아 반환함.

    ```
    const foo = { name: 'joy', age: 28 };
    console.log(foo.toString()); // '[object Object]'
    ```

### 프로토타입 체인의 종료
- 부모 객체 탐색을 계속하다가 **Object.prototype**까지 도달하면 탐색 종료.
- 만약 모든 프로토타입 체인에서 속성을 찾지 못하면 **undefined**를 반환.


### 프로토타입 체인의 예시 구조
```
foo --> Object.prototype --> null (체인 종료)
```

### 프로토타입 활용 예시
모든 객체는 기본적으로 Object.prototype에 정의된 메서드를 사용 가능.
```
console.dir(foo.__proto__); // Object.prototype
console.log(foo.hasOwnProperty('name')); // true
```