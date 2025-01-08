# 프론트엔드 컨테이너화

## 1. 컨테이너 구성 및 테스트 개요
- 베이스 이미지 결정: 컨테이너의 기본이 되는 이미지 선택
- Dockerfile 구성: 컨테이너 환경 설정
- 테스트:
    - Docker Compose를 사용해 DB와 BE(Backend)를 동일 네트워크에서 실행
    - Postman을 사용한 독립 테스트 진행

## 2. Dockerfile 구성
- 베이스 이미지: node:18
- 애플리케이션 설치 및 실행 위치: /var/app
- 컨테이너 빌드:
    - 의존성 설치: npm ci --omit=dev
    - 타입스크립트 소스 빌드 및 복사
- 환경 변수 설정:
    - 포트(Port)
    - 데이터베이스 정보(host, port, user, password 등)
    - CORS_ALLOWED_ORIGIN

## 3. Dockerfile 작성 예시
```dockerfile
FROM node:18
WORKDIR /var/app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY ./build/ ./build/
ENV PORT=3031
EXPOSE 3031
HEALTHCHECK CMD curl --fail http://localhost:3031/healthcheck || exit 1
ENTRYPOINT ["node", "."]
```
- 헬스체크(Healthcheck) 라우트 설정: /src/routes/healthcheck.ts

## 4. 컨테이너 이미지 빌드 테스트
- Dockerfile을 기반으로 BE 컨테이너 이미지를 빌드
- 빌드 후 이미지 레이어 구성 확인 및 저장

## 5. Makefile 타겟 추가
- MacOS (특히 Apple Silicon 환경)에서 Docker 이미지를 빌드할 경우 아키텍처 설정 필요
- Makefile 예시:
    ```makefile
    ARCH=amd64
    IMG_TAG="..."
    all:
        cat ./Makefile
    test:
        CI=true npm test
    node:
        npm ci
        npm run build
    image:
        docker build --platform=linux/${ARCH} --tag ${IMG_TAG}
    ```

## 6. 데이터베이스 초기화
- 테스트용 데이터베이스 구성:
    - 초기화 파일 적용
    - DB_HOST가 localhost이기 때문에 CLI에서 --protocol tcp 옵션 사용 필요
- 절차:
    - docker compose up -d
    - MySQL 클라이언트로 DB 초기화
    - DB 상태 확인
    - docker compose down으로 종료

## 7. BE 컨테이너 실행 환경
- Docker Compose YAML 파일을 사용해 컨테이너 환경 설정
- 데이터베이스 포트 및 네트워크 설정
    ```yaml
    services:
    backend:
        image: (...)
        environment:
        DB_HOST: db
        DB_PORT: 3306
        ports:
        - 3031:3031
        networks:
        - notes
    ```

## 8. BE 컨테이너 실행 절차
- docker compose up -d
- Healthcheck 완료 대기
- Postman을 사용해 API 테스트
- docker compose down으로 컨테이너 종료

## 9. FE 컨테이너 실행 구조
- 로컬 클러스터(Docker Desktop)에서 FE, BE, DB 컨테이너 실행
- FE 컨테이너는 REACT_APP_ 환경 변수를 사용해 설정 필요

## 10. 환경 변수 적용 및 전달
- 환경 변수 저장:
- REACT_APP_으로 시작하는 환경 변수를 window._ENV 객체로 저장
- /var/app/build/env.js 파일에 저장
- Docker Entrypoint에서 실행:
    ```bash
    echo -n "" > ./build/env.js
    echo "window._ENV={" >> ./build/env.js
    for key in $(compgen -v | grep ^REACT_APP_); do
    echo "$key:'${!key}'," >> ./build/env.js
    done
    echo "}" >> ./build/env.js
    ```

- HTML에서 env.js 불러오기:
    ```html
    <script src="%PUBLIC_URL%/env.js"></script>
    ```

## 11. FE Dockerfile 작성
```dockerfile
FROM node:18
WORKDIR /var/app
RUN npm install -g serve
COPY build ./build
EXPOSE 3000
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
```

## 12. FE 컨테이너 실행 환경 설정 (docker-compose.yaml)
```yaml
services:
  frontend:
    image: (...)
    environment:
      REACT_APP_API_BASE_URL: http://localhost:3031
    ports:
      - 3000:3000
    networks:
      - notes
```

## 13. FE 컨테이너 실행 및 테스트
1. docker compose up -d
1. 브라우저에서 테스트 진행 (localhost:3000)
1. docker compose down으로 종료

## 14. Makefile 타겟 추가 (FE)
- BE와 유사하게 Apple Silicon 환경에서 아키텍처 설정
- Docker 이미지 빌드 타겟 추가
