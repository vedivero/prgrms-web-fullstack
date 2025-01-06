# React 프로젝트 설정 및 구조 정리

## 설정
### 1. React App 생성
- Typescript 기반의 React App 생성
    ```bash
    npx create-react-app frontend --template typescript
    ```

### 2. Craco (Create-React-App Configuration Override) 설정
- Webpack 설정을 override하기 위해 Craco 사용
- Craco 설치 및 Webpack 플러그인 설정
    ```bash
    npm i tsconfig-paths-webpack-plugin
    craco.config.js 설정 파일 작성
    ```

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

### 3. 환경 설정

- .env 파일에서 API base URL 설정

    ```bash
    REACT_APP_API_BASE_URL=http://localhost:3031
    ```

- Production 환경에서는 build/env.js 파일을 통해 환경 변수 설정
    ```bash
    echo -n "" > ./build/env.js
    echo "window._ENV={" >> ./build/env.js
    for key in $(compgen -v | grep ^REACT_APP_); do
    echo "$key:\"${!key}\"," >> ./build/env.js
    done
    echo "}" >> ./build/env.js
    ```
- settings.ts에서 환경 변수를 import

    ```typescript
    const { REACT_APP_API_BASE_URL: API_BASE_URL = "" } = window._ENV ?? process.env;
    export { API_BASE_URL };
    ```

    - 디렉토리 구조
        ```bash
        /src
        ├── index.t```sx         # 앱 진입점
    ├── App.tsx           # 메인 앱 컴포넌트
    ├── router.tsx        # 라우터 설정
    ├── settings.ts       # 환경 변수 파일
    ├── pages/            # 페이지 컴포넌트
    ├── components/       # UI 세부 컴포넌트
    ├── hooks/            # React Query 관련 커스텀 훅
    ├── apis/             # API 호출 함수
    ├── types/            # 타입 정의
    └── utils/            # 유틸리티 함수
    주요 파일 설명
    index.tsx: ReactDOM을 사용해 App을 렌더링
    App.tsx: QueryClientProvider와 RouterProvider를 포함하는 메인 앱
    router.tsx: 라우팅 구성
    pages/: 각 라우트에 연결된 페이지 컴포넌트
    components/: 작은 UI 단위 컴포넌트
    hooks/: React Query를 사용한 데이터 패칭 훅
    apis/: REST API 호출 함수
    utils/: 공통적으로 사용하는 유틸 함수
    ```

### 5. 주요 라이브러리 설치
```bash
npm install react-router-dom @tanstack/react-query styled-components open-color
```

### 6. 파일 정리 및 리포지토리 설정
- 사용하지 않는 파일 삭제

    ```css
    src/
    ├── App.test.tsx
    ├── index.css
    ├── logo.svg
    └── reportWebVitals.ts
    ```
- GitHub 리포지토리 초기화 및 .gitignore 설정

### 7. React App 실행 및 확인
```bash
npm start
```
- localhost:3000에서 앱이 실행됨

### 8. 테스트 실행
```bash
CI=true npm test
```

---
<br>
<br>
<br>

# 프로젝트 구조

## 주요 디렉토리

```mathematica
/src
  ├── components
  │   ├── LoginForm.tsx
  │   ├── JoinForm.tsx
  │   └── NoteList.tsx
  ├── hooks
  │   ├── useJoin.ts
  │   └── useLogin.ts
  ├── apis
  │   ├── requestJoin.ts
  │   └── fetchNotes.ts
  ├── pages
  │   ├── Index.tsx
  │   ├── Join.tsx
  │   └── Note.tsx
  ├── utils
  │   ├── http.ts
  │   └── errorHandler.ts
  └── router
      └── router.tsx
```

## 2. 주요 파일 설명

### 1. Components (UI 컴포넌트)
- LoginForm.tsx: 이메일/비밀번호 입력 및 로그인 폼
- JoinForm.tsx: 회원가입 폼 (비밀번호 확인 포함)
- NoteList.tsx: 작성된 노트 목록을 보여주는 컴포넌트
### 2. Pages (페이지 구성)
- Index.tsx: 메인 페이지
- Join.tsx: 회원가입 페이지
- Note.tsx: 노트 상세 페이지
### 3. Hooks (React Query 훅)
- useJoin.ts: 회원가입 API 호출을 위한 커스텀 훅
- useLogin.ts: 로그인 API 호출을 위한 훅
### 4. Apis (API 호출 함수)
- requestJoin.ts: 회원가입 API 호출
- fetchNotes.ts: 노트 목록 조회 API 호출
### 5. Utilities (유틸리티 함수)
    - http.ts: Axios 인스턴스 및 HTTP 요청
    ### 6. Router (라우팅 설정)
    - router.tsx: react-router-dom을 이용한 페이지 라우팅 설정

    ## 3. 주요 흐름 및 API 연동``` 예시

### 회원가입 흐름 예시

- Join.tsx → JoinForm.tsx
- 회원가입 버튼 클릭 → useJoin.ts 훅 호출
- API 호출 → requestJoin.ts에서 /users 엔드포인트로 POST 요청

### 에러 처리 흐름

- API 호출 중 409 Conflict 발생 시 useJoin.ts에서 "conflict" 메시지 반환
- 성공적으로 요청 완료 시 "success" 메시지 반환

## 4. 개발 환경 설정 및 초기 작업

- React App 생성

    ```bash
    npx create-react-app frontend --template typescript
    ```

- Craco 설정

    ```bash
    npm install tsconfig-paths-webpack-plugin
    ```

- 환경 변수 설정

    - .env 파일에 API base URL 설정

- 프로덕션 환경 변수 설정

    ```bash
    echo "window._ENV={" >> ./build/env.js
    echo "REACT_APP_API_BASE_URL:'http://localhost:3031'" >> ./build/env.js
    echo "}" >> ./build/env.js
    ```