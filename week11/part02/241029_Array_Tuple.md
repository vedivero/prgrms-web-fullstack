## 1. Array와 Tuple의 차이
- Array: 길이가 가변적이며 동일한 타입의 요소로 구성
- Tuple: 길이가 고정적이며 각 요소의 타입이 미리 정해짐

## 2. Array 예제

```
// 숫자 배열
let numbers: number[] = [1, 2, 3, 4, 5];


// 문자열 배열
let fruits: string[] = ['apple', 'banana', 'orange'];


// 숫자 배열 순회
for (let i = 0; i < numbers.length; i++) {
   console.log(numbers[i]);
}


// 문자열 배열 순회
for (let i = 0; i < fruits.length; i++) {
   console.log(fruits[i]);
}


// 혼합된 타입 배열 (유니온 타입 사용)
let mixedArray: (number | string)[] = [1, 'two', 3, 'four'];

for (let i = 0; i < mixedArray.length; i++) {
   console.log(mixedArray[i]);
}


// 타입스크립트가 타입을 추론한 배열
let infer = [1, 2, 3];

for (let i = 0; i < infer.length; i++) {
   console.log(infer[i]);
}


// 읽기 전용 배열
let readOnlyArray: ReadonlyArray<number> = [1, 2, 3];

// readOnlyArray[0] = 10; // 오류: 읽기 전용 배열이므로 수정 불가
```


## 3. Tuple 예제

```
// 튜플: 각 요소의 타입과 순서가 고정됨
let greeting: [number, string, boolean] = [1, 'hello', true];

for (let i = 0; i < greeting.length; i++) {
   console.log(greeting[i]);
}
```

## 4. Spread 연산자를 활용한 배열 결합

```
// 두 배열을 결합하는 Spread 연산자 사용
let firstArray = [1, 2, 3];
let secondArray = [4, 5, 6];

let combineArray = [...firstArray, ...secondArray];
console.log(combineArray); // [1, 2, 3, 4, 5, 6]

// 결합된 배열 순회
for (let i = 0; i < combineArray.length; i++) {
   console.log(combineArray[i]);
}
```

## 5. 결론
- Array는 가변적인 길이와 동일한 타입의 요소를 다룰 때 유용
- Tuple은 정해진 순서와 타입의 데이터를 처리하는 데 적합
- ReadonlyArray는 읽기 전용 배열을 만들어 안전한 데이터 처리를 도와줌
- Spread 연산자를 통해 배열을 간편하게 결합 가능