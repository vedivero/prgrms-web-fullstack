# 백엔드 단위 테스트 구현 정리 

## 1. 단위 테스트 개요

- 백엔드 단위 테스트
    - 독립적으로 테스트 가능한 모든 함수/메서드는 테스트 대상.
    - 여러 모듈이 결합된 경우, 다양한 요청 상황에 맞는 테스트 케이스를 작성.
    - 데이터베이스 및 쿠키와 같은 외부 상태에 의존하는 경우 Mock 사용 필요.
- 예시
    - "GET /users/me" 요청에 대한 단위 테스트 작성.
    - 테스트 코드 작성 및 mock 사용법을 설명.
    - TDD(테스트 주도 개발) 적용 여부는 개인의 선택 사항.

## 2. 테스트 흐름
- 응용 시나리오
    - Browser: GET /users/me 요청.
    - Router (users.ts): 요청을 받아 middleware에 전달.
    - Middleware (authentication.ts): JWT 검증 후 user 데이터 요청.
    - Model (user.ts): 데이터베이스에서 user 정보 조회 후 반환.
- 테스트 시나리오
    - 요청 발생 및 응답 확인.
    - mock을 사용하여 JWT, DB 등을 가짜로 생성하여 테스트.
    - 관련 파일:
        - routes/users.test.ts (라우트 테스트)
        - __mocks__/jsonwebtoken.ts (JWT Mock)
        - models/__mock__/user.ts (DB Mock)

## 3. 필요 라이브러리 설치

```bash
npm install cookie-parser jsonwebtoken
npm install --save-dev jest ts-jest supertest
npm install --save-dev @types/cookie-parser @types/jest @types/jsonwebtoken @types/supertest
```

## 4. 테스트 환경 설정

- jest.config.js

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```
- tsconfig.json

```json
{
  "compilerOptions": {
    "include": ["src"],
    "exclude": ["src/**/*.test.ts", "src/**/__mocks__/*.ts"]
  }
}
```
## 5. Mock 제작
- User Mock (DB)
    - src/models/__mocks__/user.ts
        ```typescript
        export class User {
        constructor(
            public readonly id: number,
            public email: string,
            public encryptedPassword: string
        ) {}
        static async findOne(params: { email: string }) {
            return MOCK_USERS.find((user) => user.email === params.email) || null;
        }
        }

        export const MOCK_USERS: User[] = [];
        ```
- JWT Mock
    - src/__mocks__/jsonwebtoken.ts
        ```typescript
        const jwt = {
        sign: jest.fn(({ email }) => "mock_jwt_" + email),
        verify: jest.fn((token) => {
            if (!token.startsWith("mock_jwt_")) {
            throw new Error("Invalid token");
            }
        }),
        decode: jest.fn((token) => {
            if (!token.startsWith("mock_jwt_")) {
            throw new Error("Invalid token");
            }
            return { email: token.replace("mock_jwt_", "") };
        }),
        };

        export default jwt;
        ```

## 6. Middleware 구현
- 사용자 인증을 위한 middleware
- jsonwebtoken 모듈은 __mocks__에서 가짜로 대체됨.
- src/middlewares/authentication.ts
    ```typescript
    import jwt from "jsonwebtoken";

    export async function authenticateUser(req, res, next) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.sendStatus(401);
    }
    jwt.verify(accessToken);
    const { email } = jwt.decode(accessToken);
    req.user = await User.findOne({ email });
    next();
    }
    ```

## 7. 라우트 테스트
- src/routes/users.test.ts
    ```typescript
    import request from "supertest";
    import { app } from "../app";
    import { User, MOCK_USERS } from "../models/__mocks__/user";

    jest.mock("../models/user", () => jest.requireActual("../models/__mocks__/user"));

    afterEach(() => {
    MOCK_USERS.splice(0, MOCK_USERS.length);
    });

    describe("GET /users/me", () => {
    test("유효한 JWT 쿠키가 있을 경우 200 응답", async () => {
        MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted"));

        const response = await request(app)
        .get("/users/me")
        .set("Cookie", "access-token=mock_jwt_apple@example.com");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ email: "apple@example.com" });
    });
    });
    ```

## 8. 구현할 코드 구성
- Router
    - src/routes/users.ts – GET /users/me 라우트 구현.
- Main App
    - src/app.ts – cookie-parser, usersRouter 적용.
- Middleware
    - src/middlewares/authentication.ts – 인증 미들웨어.
- Model
    - src/models/user.ts – DB에서 사용자 조회 (실제 코드 테스트에서 제외됨).
    - 대신 src/models/__mocks__/user.ts 사용.
