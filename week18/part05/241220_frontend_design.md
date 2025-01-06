# FE 프로젝트 구조 설계

## 1. 프로젝트 개요
- Main Framework: React.js v18
- State Management Library: TanStack React Query
- Style Library: styled-components
- Dev. Server URL: http://localhost:3000
- NPM Command:
    - start : 로컬 개발 서버 실행
    - build : 프로덕션 빌드를 위한 Webpack 사용

## 2. FE 패키지 구조
디렉토리 구조: /src

- index.tsx : 스크립트 진입점
- App.tsx : 메인 앱 컴포넌트
- App.css : 메인 스타일시트
- router.tsx : 라우터 파일
- settings.ts : 환경변수 설정 파일
- pages/ : 페이지 컴포넌트 모음
- components/ : 세부 컴포넌트 모음
- hooks/ : React Query 관련 Hook
- apis/ : API 호출 함수
- types/ : 타입 정의
- utils/ : 유틸리티 함수
- assets/ : 아이콘 및 이미지

## 3. Page Components
디렉토리 구조: /src/pages

- Index.tsx
    - 경로: /
    - 내용: 메인 랜딩 페이지
- Login.tsx
    - 경로: /login
    - 내용: 로그인 페이지
- Join.tsx
    - 경로: /join
    - 내용: 회원가입 페이지
- Error.tsx
    - 경로: /error
    - 내용: 에러 페이지 (404, 401 등)
- notes 디렉토리
    - Index.tsx: 노트 목록 페이지 (/notes)
    - Detail.tsx: 노트 상세 및 편집 페이지 (/notes/:noteId)

## 4. 구성 요소
- Page Components: 주요 페이지 단위로 구성.
- (Smaller) Components: 세부 컴포넌트 단위로 분리.
- API 함수: API 호출 관련 로직 관리.
- React Query Hooks: 상태 관리를 위한 커스텀 훅 모음.
- Utility: 유틸리티 함수 및 공통 로직.

## 5. Components 구조
디렉토리: /src/components
- LoginForm.tsx
    - 내용: 이메일/패스워드 입력 및 로그인/회원가입 버튼
    - 역할: 로그인 폼 및 버튼 제공
- JoinForm.tsx
    - 내용: 이메일/패스워드/확인 입력 및 회원가입 버튼
    - 역할: 회원가입 폼 및 버튼 제공
- NoteList.tsx
    - 내용: 사용자가 작성한 노트 목록
    - 역할: 노트 클릭 시 상세조회 및 편집 페이지 이동
- NoteTitleInput.tsx
    - 내용: 노트 제목 입력
    - 역할: 노트 제목 작성

## 6. Note Editor 관련 컴포넌트
디렉토리: /src/components

- NoteContentEditor.tsx
    - 내용: 노트 내용 에디터 입력
    - 역할: tiptap 라이브러리로 노트 내용 작성

## 7.  HOCs (Higher-Order Components)
디렉토리: /src/components/hocs

- withUnauthenticated.tsx
    - 역할: 로그인 상태 시 컴포넌트 렌더링 방지, 노트 목록으로 리다이렉트
- withAuthenticatedUser.tsx
    - 역할: 로그인되지 않은 상태 시 컴포넌트 렌더링 방지, 로그인 URL로 리다이렉트
    - 로그인 시 props로 사용자 정보 전달
- withCurrentNote.tsx
    - 역할: 현재 URL에서 노트 정보 불러와 props로 전달
## 8.  API 호출 함수
디렉토리: /src/apis

- REST API 호출 함수 목록
    - fetchCurrentUser
    - requestLogin
    - requestLogout
    - requestJoin
    - fetchNotes
    - fetchNote
    - createNote
    - updateNote
    - deleteNote

## 9.  React Query Hooks
디렉토리: /src/hooks

- API 호출을 위한 React Query Hook 목록
    - useNotes
    - useNote
    - useCreateNote
    - useUpdateNote
    - useDeleteNote
    - useCurrentUser
    - useJoin
    - useLogin
    - useLogout

## 10.  Utility 함수
디렉토리: /src/utils

- http.ts
    - 내용: Axios 클라이언트
    - 역할: REST API 요청을 위한 Axios 인스턴스 제공
- getStatusFromError.ts
    - 내용: 에러 객체에서 Status Code 추출
    - 역할: 상태 코드 반환