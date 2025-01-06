# 데이터베이스 설계 및 초기화

## 1. 데이터베이스 스키마 설계
- users 테이블

    - id (Primary Key): int(11) - 자동 증가(auto_increment)
    - email: varchar(256)
    - encrypted_password: text

- notes 테이블

    - id (Primary Key): int(11) - 자동 증가
    - title: text
    - content: text
    - user_id (Foreign Key): int(11) → users.id 참조
    - created_at: timestamp - 기본값 CURRENT_TIMESTAMP
    - updated_at: timestamp - 기본값 CURRENT_TIMESTAMP 및 갱신 시 업데이트


## 2. 데이터베이스 초기화 파일


- init-user.sql
    - 사용자 계정 생성 및 권한 부여

        ```sql
        CREATE USER IF NOT EXISTS 'prgms'@'localhost' IDENTIFIED BY '비밀번호';
        GRANT ALL PRIVILEGES ON prgms_notes.* TO 'prgms'@'localhost';
        FLUSH PRIVILEGES;
        ```
- init-db.sql
    - 데이터베이스 및 테이블 생성
        ```sql
            CREATE SCHEMA IF NOT EXISTS `prgms_notes` DEFAULT CHARACTER SET utf8mb4;
            CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT,
            email VARCHAR(256) NOT NULL,
            encrypted_password TEXT NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX users_unique_email (email)
        );

        CREATE TABLE IF NOT EXISTS notes (
            id INT NOT NULL AUTO_INCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            user_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
        );
        ```

- init-test-db.sql
    - 테스트 데이터 삽입
        ```sql
        INSERT INTO users VALUES (1, 'test@example.com', '암호화된 비밀번호');
        INSERT INTO notes VALUES (1, '테스트 노트', '노트 내용', 1, NOW(), NOW());
        ```

## 3. 로컬 테스트 환경 구성
- Docker Desktop을 사용하여 로컬 Kubernetes 클러스터에 데이터베이스 배포
- 

##k8s manifest를 사용해 DB 인스턴스 실행 및 초기화 파일 로드

## 4. Kubernetes 설정 파일
- Deployment 및 Service (notes-db.yaml)
    - MariaDB 컨테이너 배포 및 NodePort 서비스 구성
- Persistent Volume 및 PVC (notes-db-volume.yaml)
    - 영구 데이터 보관을 위한 볼륨 설정

## 5. 5. 데이터베이스 접근
- 로컬에서 NodePort를 통해 데이터베이스 접근

    ```bash
    mysql --protocol tcp -P 30036 -u prgms -p
    ```