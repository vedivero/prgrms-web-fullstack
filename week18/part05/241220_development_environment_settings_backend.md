# Node.js 프로젝트 초기 설정 및 서버 구현

## 1. 프로젝트 생성 및 초기화

- 프로젝트 디렉토리 생성 및 초기화

    ```bash
    mkdir backend
    cd backend
    npm init -y
    ```
    - npm init -y는 기본 설정으로 package.json 파일을 생성


## 2. 필수 패키지 설치
- 애플리케이션에 필요한 기본 패키지 설치
    ```bash
    npm i dotenv express express-async-errors
    npm i -D typescript @types/express nodemon
    ```
    - dotenv: 환경 변수 로드
    - express: 서버 프레임워크
    - express-async-errors: 비동기 에러 핸들링
    - nodemon: 개발 중 서버 자동 재시작
    - typescript: TypeScript 사용

## 3. 프로젝트 설정

- package.json에 빌드 및 실행 스크립트 추가
    ```json
    "scripts": {
    "start": "nodemon",
    "build": "tsc"
    }
    ```
- nodemon.json 설정
    ```json
    {
    "watch": ["src"],
    "ext": "ts,json",
    "exec": "tsc && node ."
    }
    ```
- TypeScript 컴파일러 옵션 (tsconfig.json)
    ```json
    {
    "compilerOptions": {
        "target": "ES2022",
        "module": "CommonJS",
        "outDir": "./build"
    },
    "include": ["src"]
    }
    ```

## 4. 환경 설정
- .env 파일 생성
    ```makefile
    NODE_ENV=development
    - PORT=3031
        ```
        ```ts
        ```
    - import dotenv from "dotenv";
    dotenv.config();
    export const PORT = process.env.PORT || 3031;
    ```

## 5. 서버 구현

- app.ts: Express 애플리케이션 구성

    ```ts
    import express, { Request, Response, NextFunction } from "express";
    import "express-async-errors";

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.sendStatus(500);
    });

    export { app };
    - ```

        ```ts
        ```
    - import { app } from "./app";
    import { PORT } from "./settings";

    app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    });
    ```

## 6. 빌드 및 실행
- 개발 서버 실행
    ```bash
    npm start
    TypeScript 컴파일 및 프로덕션 실행
    ```
    ```bash
    npm run build && serve -s build
    ```

## 테스트 및 검증
- 서버 정상 동작 확인
    ```bash
    curl localhost:3031
    ```
- Cannot GET / 메시지가 뜨면 서버가 정상적으로 실행된 것.