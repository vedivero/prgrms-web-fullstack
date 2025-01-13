## AWS 콘솔 로그인 및 초기 설정

- AWS 콘솔 로그인
    - 제공된 로그인 URL로 접속: https://180993267331.signin.aws.amazon.com/console
    - ID와 초기 비밀번호 입력 후 로그인.
- 콘솔 로그인 후 설정
    - 비밀번호 변경: 보안 강화를 위해 반드시 변경.
    - MFA(Multi-Factor Authentication) 설정: 추가 인증 수단을 활성화하여 계정 보안을 강화.

## 실습 순서

- EC2 인스턴스 생성과 네트워크 설정
    - AWS 콘솔에서 EC2 인스턴스 생성.
    - 각자에게 제공된 도메인 이름과 Elastic IP를 연결하여 네트워크 구성 완료.
- SSH 접속 경로 확인
    - 인스턴스 생성 시 발급된 .pem 키 파일을 활용.
    - 로컬 컴퓨터에서 SSH 클라이언트를 사용하여 접속 경로를 확인.
- Minikube 활성화
    - Elastic IP 연결 이후 Minikube를 설치 및 활성화.
    - Minikube 실행을 통해 로컬에서 Kubernetes 클러스터 환경 구성.
- 클러스터 접근 설정
    - Kubernetes 클러스터에 접근 가능하도록 kubeconfig 파일을 로컬 컴퓨터에 다운로드.
    - kubectl 명령어를 사용해 클러스터와 통신 가능 여부 확인.
- 확인 작업
    - kubectl 명령어로 클러스터 상태를 점검.
    - 브라우저를 통해 Minikube Dashboard 접속 확인.
    - MySQL과 같은 추가 서비스를 실행 후 접속 테스트를 통해 설정 확인.