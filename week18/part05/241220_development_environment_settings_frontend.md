# 개발 환경 설정 - 프론트엔드

## 1. React 프로젝트 생성
- 명령어:
    ```bash
    npx create-react-app frontend --template typescript
    ```
- 결과: React + TypeScript 프로젝트 생성 완료.

## 2. Craco 설정 (Webpack 설정 오버라이드)

- Craco 설치:
    ```bash
    npm install @craco/craco
    ```
- 경로 별칭 플러그인 설치:
    ```bash
    npm install tsconfig-paths-webpack-plugin
    ```
- tsconfig.json 설정:
    ```json
    {
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
            "@/*": ["src/*"]
            }
        }
    }
    ```
- craco.config.js:
    ```javascript
    const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
        module.exports = {
        plugins: [
            {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig }) => {
                webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));
                return webpackConfig;
                },
            },
            },
        ],
    };
    ```

## 3. 환경 설정
- .env 파일:
    ```env
    REACT_APP_API_BASE_URL=http://localhost:3031
    ```
- 설정 파일 (settings.ts):
    ```typescript
    const { REACT_APP_API_BASE_URL: API_BASE_URL = "" } = process.env;
    export { API_BASE_URL };
    ```

## 4. Axios 클라이언트 설정
- http.ts:
    ```typescript
    import axios from "axios";
    import { API_BASE_URL } from "@/settings";

    export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    withCredentials: true,
    });
    ```

## 5. API 호출 함수
- apis/index.ts:
    ```typescript
    export const fetchCurrentUser = () => httpClient.get("/user");
    export const requestLogin = (data) => httpClient.post("/login", data);
    export const requestJoin = (data) => httpClient.post("/join", data);
    ```

## 6. React Query Hooks
- src/hooks/:
    ```typescript
    import { useMutation, useQuery } from "react-query";
    import { fetchCurrentUser, requestJoin } from "@/apis";

    export const useCurrentUser = () => useQuery("currentUser", fetchCurrentUser);
    export const useJoin = () => useMutation(requestJoin);
    ```

## 7. Component 구조
- src/components:
    - LoginForm.tsx: 로그인 폼 및 버튼
    - JoinForm.tsx: 회원가입 폼 및 버튼
    - NoteList.tsx: 노트 목록
    - NoteContentEditor.tsx: 노트 에디터

## 8. HOC (Higher-Order Component)
- src/components/hocs:
    - withAuthenticatedUser.tsx: 로그인 안된 상태에서 로그인 페이지로 리디렉트
    - withUnauthenticated.tsx: 로그인 상태면 특정 페이지로 리디렉트
    - withCurrentNote.tsx: 현재 URL 기반으로 노트 정보 가져오기

## 9. 개발 환경에서의 확인
- 서버 실행:
    ```bash
    npm start
    ```
- 테스트 실행:
    ```bash
    CI=true npm test
    ```

## 10. 배포 환경 설정
- env.js 파일 생성:
    ```bash
    echo -n "" > ./build/env.js
    echo "window._ENV={" >> ./build/env.js
    for key in $(compgen -v | grep ^REACT_APP_); do
    echo "$key:'${!key}'," >> ./build/env.js
    done
    echo "}" >> ./build/env.js
    ```