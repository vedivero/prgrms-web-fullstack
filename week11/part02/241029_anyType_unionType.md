

## 1. any 타입

- 타입스크립트에서는 타입 정보를 풍부하게 제공할수록 좋음
- 타입 정보는 개발자의 의도를 명확하게 전달
- 효율적인 코드 유지보수 가능
- any 타입을 남용하지 말 것
- 타입을 지정할 수 없는 제한적인 경우에만 any 타입 사용

    ```
    let anyVal: any = 100;
    anyVal = true; // 어떤 값이든 허용됨
    ```

## 2. 유니온 타입 (Union Types)
- 유니온 타입은 동시에 여러 타입을 지정하고 싶을 때 사용
- `|` 기호를 사용해 타입을 나열
- 해당 변수는 나열된 타입 중 하나의 값을 가질 수 있음

    ```
    type strOrNum = number | string;
    let numStr: strOrNum = 100; // 유효
    ```

## 3. 유니온 타입 활용 예제
- 유니온 타입을 활용해 매개변수의 타입을 명확하게 제한하고 처리

    ```
    let item: number; // number 타입 변수

    function converToString(val: strOrNum): string {
    
        if (typeof val === 'string') {
            item = 0; // 문자열일 경우 item을 0으로 설정
        } else {
            item = val; // 숫자일 경우 해당 값을 item에 할당
        }

        return String(val); // 값을 문자열로 변환해 반환
    }
    ```
