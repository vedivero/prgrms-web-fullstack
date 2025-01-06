# 소프트웨어 구조 설계 및 BE 패키지 구조

## 1. 소프트웨어 구조 설계서 (Architecture Design Specification)
- 목적: 소프트웨어의 구조 설계를 문서화하고 정의하는 문서
- 중요성: 소프트웨어 개발 과정에서 중요한 기준이 되며, 프로젝트 초기 단계에서 필수적으로 작성됨
- 프로젝트 관점: 이미 정의된 소프트웨어 아키텍처가 존재할 경우 이를 분석하고 구현 계획을 세우는 것이 중요

## 2. BE 구조 설계서 작성 개요
- 주요 패키지 구성 요소:
- Route: 사용자 로그인/로그아웃, 사용자 관리, 노트 관리
- Model: 노트 및 사용자 데이터 구조
- Utility: MySQL 관련 유틸리티 함수
- Middleware: 인증(authentication) 및 권한(authorization) 처리

## 3. 기술 스택 및 설정
- Main Framework: Express.js
- DBMS: MariaDB 11
- Dev Server URL:
    - Express: http://localhost:3031
    - MariaDB: localhost:3306
- NPM 명령어:
    - start: 로컬 개발 서버 실행
    - build: 타입스크립트로 빌드 후 배포

## 4. 디렉토리 구조
- src/
    - index.ts, app.ts: 앱 진입점 파일
    - settings.ts: 환경 변수 및 설정
    - routes/: API 라우트 모음
    - models/: 데이터 모델 클래스
    - utils/: DB 및 기타 유틸리티 함수
    - middlewares/: 인증 및 권한 미들웨어

## 5. 주요 라우트 구성
- /src/routes/users.ts
    - POST /login: 이메일 및 비밀번호로 로그인, JWT 쿠키 발급
    - POST /logout: 로그아웃 및 쿠키 삭제
    - GET /users/me: 현재 사용자 정보 조회
    - POST /users: 회원가입 (이메일, 비밀번호 기반)
- /src/routes/notes.ts
    - GET /: 사용자 작성 노트 목록 조회
    - GET /:id: 특정 노트 상세 조회
    - POST /: 새 노트 작성
    - PUT /:id: 기존 노트 업데이트
    - DELETE /:id: 노트 삭제

## 6. 모델 구성
- /src/models/note.ts: 노트 CRUD 기능 제공
- /src/models/user.ts: 사용자 CRUD 및 BCrypt로 비밀번호 암호화

## 7. 유틸리티 구성
- /src/utils/mysql.ts: MySQL Pool 인스턴스 생성 및 제공

## 8. 미들웨어 구성
- /src/middlewares/authentication.ts
    - authenticateUser(): 쿠키의 JWT를 검증해 사용자 인증
- /src/middlewares/authorization.ts
    - authorizeNote(): 사용자와 노트의 소유 여부를 검증해 권한 부여
