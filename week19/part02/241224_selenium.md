# Selenium

## 1. Selenium 소개
- Selenium: 웹 브라우저 자동화 도구
- 공식 사이트: https://selenium.dev
- 주요 특징:
    - Selenium automates browsers. That's it!
    - 웹 애플리케이션 테스트 및 관리 작업 자동화

## 2. Selenium 구성 요소
- Selenium WebDriver
    - 브라우저 자동화 드라이버
    - 다양한 브라우저 지원
- Selenium IDE
    - 사용자 상호작용 녹화 및 재생
    - Chrome 및 Firefox 확장 프로그램으로 사용 가능
- Selenium Grid
    - 분산 테스트 환경 구축
    - 여러 테스트 머신에서 병렬로 테스트 수행

## 3. Selenium Grid 구성도
- 클라이언트 → 라우터 → 세션 큐 및 매핑 → 노드
- 다양한 브라우저(Chrome, Firefox, Safari 등)에서 테스트 수행 가능

## 4. 실습 개요
- Docker를 이용한 Selenium Standalone 실행
    - 이미지: selenium/standalone-chrome
    - 포트: 4444
- Python 클라이언트로 테스트 수행
    - Selenium Python 라이브러리 설치
    - 간단한 테스트 코드 작성 및 실행


## 5. 테스트 실행 절차
- Docker에서 Selenium Standalone 실행
- Python 스크립트로 WebDriver 초기화 및 테스트 수행
- 결과 확인 후 브라우저 종료
