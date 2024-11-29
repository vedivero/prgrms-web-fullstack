# 쿠버네티스

## 마이크로서비스 아키텍처 (MSA)

- 정의: 시스템을 독립적인 서비스로 나누어 개발하는 아키텍처 스타일.
    - 특징:
    - 각 서비스는 특정 기능만 수행하고 독립적으로 배포 가능.
    - 전통적인 모놀리식 아키텍처와 달리 서비스 간 의존도를 낮춤.
    - 서비스 간 통신은 보통 API를 통해 이루어짐.
- 장점:
    - 확장성: 개별 서비스 단위로 확장 가능.
    - 유연성: 특정 서비스만 업데이트/변경 가능.
    - 효율성: 팀별로 분리된 서비스 개발이 가능.



## 컨테이너 인프라와 MSA의 관계
- 컨테이너 모델 특징:
    - 각 서비스는 독립된 컨테이너로 배포.
    - 컨테이너는 필요한 실행 환경을 포함해 동일한 상태에서 실행 가능.
- 적용 사례:
    - 사용자 인터페이스, 비즈니스 로직, 데이터베이스, 백업 서비스 등 역할별로 분리된 컨테이너 사용.

## 쿠버네티스(Kubernetes)
- 정의: 컨테이너 오케스트레이션 솔루션.
    - 컨테이너의 배포, 확장, 관리를 자동화.
- 특징:
    - 다수의 컨테이너를 클러스터로 관리.
    - 동적 확장 및 장애 복구 지원.
    - CI/CD 환경에서 유용.
- 구성 요소:
    - 마스터 노드(Control Plane): API 서버, 스케줄러, 컨트롤러 매니저 등.
    - 워커 노드(Worker Node): 컨테이너 실행 및 관리(CRI, kubelet 등).


## Pod와 컨테이너

![alt text](image-2.png)

- Pod:
    - Kubernetes에서 가장 작은 배포 단위.
    - 하나 이상의 컨테이너를 포함.
- 컨테이너:
    - 실제 실행 단위로, Pod 안에서 동작.
- 연관성:
    - Pod는 컨테이너 간 네트워크와 스토리지를 공유.

    


## Kubernetes가 제공하는 주요 기능
- 컨테이너 밸런싱:
    - Pod의 부하를 균등하게 분산.
- 트래픽 로드 밸런싱:
    - 다수의 Pod 간 트래픽을 균등하게 분배.
- 수평적 확장 (HPA):
    - 부하에 따라 Pod 수를 자동 조절.
- 오류 복구:
    - 장애 발생 시 새로운 Pod를 생성해 서비스 유지.
- 롤링 업데이트:
    - 점진적으로 업데이트 배포.
- 스토리지 오케스트레이션:
    - 다양한 스토리지 시스템을 동적으로 연결.
- 서비스 디스커버리:
    - 동적으로 생성되는 Pod를 DNS 기반으로 관리.

## Kubernetes의 생명 주기
1. 생성 요청: kubectl을 통해 API 서버에 Pod 생성 요청.
1. 상태 기록: API 서버가 etcd에 상태 저장.
1. 스케줄링: Pod를 실행할 워커 노드를 결정.
1. 실행: 워커 노드의 kubelet이 컨테이너를 실행.

## Kubernetes 오브젝트
- Pod: 컨테이너의 집합으로 단일 작업 수행.
- Namespace: 리소스 그룹 관리.
- Volume: Pod에서 사용할 디렉토리 제공.
- Service: Pod의 네트워크 접근을 추상화.


## Kubernetes 클러스터 인프라 구성
- 로컬 환경:
    - 개발 단계에서 사용, kubeadm이나 Docker Desktop 설치.
- Public Cloud:
    - AWS EKS, GCP GKE, Microsoft AKS.
- On-Prem 설치:
    - SUSE Rancher, RedHat OpenShift.


# 도커 데스크톱을 이용한 로컬 환경 클러스터 구성

- Enable Kubernetes 체크하기

    ![alt text](image.png)

    - 설치

        ![alt text](image-1.png)


## kubectl 명령어 설치

-  버전 확인

    ```
    kubectl version --client

    Client Version: v1.30.2
    Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
    ```
- `kunectl get nodes` 명렁어 입력

    ```
    kubectl get nodes

    NAME             STATUS   ROLES           AGE     VERSION
    docker-desktop   Ready    control-plane   5m44s   v1.30.2
    ```

    필드 설명:
    - NAME: 노드 이름 (예: docker-desktop).
    - STATUS: 클러스터의 상태 (예: Ready는 정상 상태).
    - ROLES: 노드 역할 (예: control-plane은 관리 노드).
    - AGE: 노드가 생성된 시간.
    - VERSION: 쿠버네티스 버전.


## 문제가 발생할 경우
- (1) kubectl 명령어를 인식하지 못할 때
    - kubectl이 설치되지 않았거나 PATH 환경 변수에 추가되지 않았을 수 있습니다.
        - 다시 설치하거나 경로를 확인

            `where kubectl`
            
            ```
            where kubectl

            C:\Program Files\Docker\Docker\resources\bin\kubectl.exe
            ```

- (2) Kubernetes 클러스터가 동작하지 않을 때
    - Docker Desktop의 Kubernetes 설정이 활성화되어 있는지 확인.
        - Docker Desktop 상태를 확인하고, 필요시 재시작

        - `Restart Docker Desktop`


---

<br>
<br>
<br>
<br>

# 쿠버네티스 기본 사용법

## 노드(Nod), 포드(Pod) 정보  조회

- 노드(Nod) 정보

    ```
    kubectl get nodes

    NAME             STATUS   ROLES           AGE     VERSION
    docker-desktop   Ready    control-plane   5m44s   v1.30.2
    ```

- 포드(Pod) 정보

    ```
    kubectl get pods

    No resources found in default namespace.
    ```

    ```
    kubectl get pods --all-namespaces

    NAMESPACE     NAME                                     READY   STATUS    RESTARTS   AGE
    kube-system   coredns-7db6d8ff4d-6d6q2                 1/1     Running   0          14m
    kube-system   coredns-7db6d8ff4d-7chhp                 1/1     Running   0          14m
    kube-system   etcd-docker-desktop                      1/1     Running   0          14m
    kube-system   kube-apiserver-docker-desktop            1/1     Running   0          15m
    kube-system   kube-controller-manager-docker-desktop   1/1     Running   0          14m
    kube-system   kube-proxy-grf8d                         1/1     Running   0          14m
    kube-system   kube-scheduler-docker-desktop            1/1     Running   0          15m
    kube-system   storage-provisioner                      1/1     Running   0          14m
    kube-system   vpnkit-controller                        1/1     Running   0          14m
    ```


## 컨테이너 이미지를 이용한 포드 생성

- 포드 생성

    ```
    kubectl run nginx-pod --image=nginx
    
    pod/nginx-pod created
    ```

- 생성된 포드 조회

    ```
    kubectl get pods

    NAME        READY   STATUS    RESTARTS   AGE
    nginx-pod   1/1     Running   0          42s
    ```

    - 상세 조회

        ```
        kubectl get pods -o wide

        NAME        READY   STATUS    RESTARTS   AGE     IP         NODE             NOMINATED NODE   READINESS GATES
        nginx-pod   1/1     Running   0          2m10s   10.1.0.6   docker-desktop   <none>           <none>
        ```



## 쿠버네티스 디플로이먼트 (Kubernetes Deployment)

### Deployment란?

- Kubernetes의 오브젝트 형태 중 하나로, 애플리케이션 배포를 위해 가장 많이 사용됨.
- 애플리케이션의 배포, 업데이트, 롤백 등의 기능을 유연하게 관리.
- 레플리카셋 (ReplicaSet) 기반으로 동일한 모양의 다수의 Pod를 생성하고 관리.
- 일반적으로 상태가 없는(Stateless) 애플리케이션 배포에 적합.

### 주요 특징

- 유지보수 및 관리

    - 동적 업데이트: 애플리케이션 업데이트 시, 무중단 배포(Rolling Update)가 가능.
    - 롤백(Rollback): 문제가 발생하면 이전 버전으로 손쉽게 복구.
    - 버전 관리: 배포 버전을 명시적으로 관리하여 안정성 확보.

- 상태관리
 
    - 디플로이먼트는 선언적 방식으로 동작.
    - 사용자가 **의도된 상태(Desired State)**를 정의하면, Kubernetes가 자동으로 이를 유지.
- Pod 복제
 
    - 디플로이먼트는 ReplicaSet을 통해 Pod 복제본을 생성 및 관리.
    - 복제본의 개수는 사용자가 정의 가능하며, 수평 확장을 통해 부하를 분산.
- Stateless 애플리케이션
 
    - 주로 데이터 저장을 요구하지 않는 서비스에 적합.
    - 예: 웹 애플리케이션의 프론트엔드.

### 동작 방식

- 디플로이먼트 정의

    - Deployment 오브젝트는 YAML 또는 JSON 파일로 정의.
    - 사용자가 원하는 Pod의 수, 이미지, 업데이트 정책 등을 선언.

- ReplicaSet 관리

    - Deployment는 ReplicaSet을 생성하여 Pod의 복제본을 관리.
    - Kubernetes가 ReplicaSet의 상태를 지속적으로 모니터링하며, 설정된 수의 Pod를 유지.

- 의도된 상태 관리
 
    - 사용자가 선언한 상태(예: Pod 5개 실행)를 Kubernetes가 감지하고 조정.
    - Pod가 삭제되거나 장애가 발생하면, 자동으로 새로운 Pod를 생성하여 상태 복구.



## 디플로이먼트 생성 방법

- 생성 명령문
    ```
    kubectl create deployment dpy-nginx --image=nginx

    deployment.apps/dpy-nginx created
    ```


- 디플로이먼트 조회

    ```
    kubectl get deployment -o wide

    NAME        READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES   SELECTOR
    dpy-nginx   1/1     1            1           44s   nginx        nginx    app=dpy-nginx
    ```

        - 필드 설명:
            - NAME
                - Deployment의 이름 (dpy-nginx).
            - READY
                - 배포된 Pod의 상태를 나타냅니다.
                - 1/1: 총 1개의 Pod가 배포되었으며, 정상적으로 준비 상태입니다.
            - UP-TO-DATE
                - 현재 업데이트된 Pod의 수입니다(Deployment에 의해 관리).
            - AVAILABLE
                - 클러스터에서 사용 가능한 상태의 Pod 수.
            - AGE
                - Deployment가 생성된 이후의 시간 (44s는 44초).
            - CONTAINERS
                - Deployment에서 실행 중인 컨테이너의 이름 (nginx).
            - IMAGES
                - Deployment에서 사용하는 Docker 이미지 이름 (nginx).
            - SELECTOR
                - Pod를 선택하는 데 사용하는 레이블. 여기서는 app=dpy-nginx가 Pod를 선택

- 디플로이먼트 상세 정보 조회

    ```
    kubectl describe deployment dpy-nginx
    Name:                   dpy-nginx
    Namespace:              default
    CreationTimestamp:      Fri, 29 Nov 2024 13:08:34 +0900
    Labels:                 app=dpy-nginx
    Annotations:            deployment.kubernetes.io/revision: 1
    Selector:               app=dpy-nginx
    Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
    StrategyType:           RollingUpdate
    MinReadySeconds:        0
    RollingUpdateStrategy:  25% max unavailable, 25% max surge
    Pod Template:
    Labels:  app=dpy-nginx
    Containers:
    nginx:
        Image:         nginx
        Port:          <none>
        Host Port:     <none>
        Environment:   <none>
        Mounts:        <none>
    Volumes:         <none>
    Node-Selectors:  <none>
    Tolerations:     <none>
    Conditions:
    Type           Status  Reason
    ----           ------  ------
    Available      True    MinimumReplicasAvailable
    Progressing    True    NewReplicaSetAvailable
    OldReplicaSets:  <none>
    NewReplicaSet:   dpy-nginx-76f8d594c6 (1/1 replicas created)
    Events:
    Type    Reason             Age    From                   Message
    ----    ------             ----   ----                   -------
    Normal  ScalingReplicaSet  2m40s  deployment-controller  Scaled up replica set dpy-nginx-76f8d594c6 to 1    
    ```


- 디플로이먼트를 동적으로 늘리는 명령어

    > Kubernetes Deployment에서 관리하는 Pod의 개수를 동적으로 3개로 설정하는 명령어

    ```
    kubectl scale deployment dpy-nginx --replicas=3
    
    deployment.apps/dpy-nginx scaled
    ```

    - dpy-nginx Deployment가 관리하는 Pod의 복제본(replica)을 3개로 확장
    - 3개의 Pod가 실행되므로, 하나의 Pod에 문제가 생기더라도 나머지 2개가 서비스를 계속 제공

        > 애플리케이션의 안정성과 가용성 증가

    - 트래픽 처리 능력 증가

        - Pod의 개수가 늘어나면 더 많은 요청(트래픽)을 처리
        - Kubernetes는 요청을 모든 Pod에 균등하게 분산(로드 밸런싱)하므로, 트래픽 증가에 유연하게 대응

- 늘어난 Pod 확인

    ```
    kubectl get pods -o wide

    NAME                         READY   STATUS    RESTARTS   AGE     IP         NODE             NOMINATED NODE   READINESS GATES
    dpy-nginx-76f8d594c6-7ksfg   1/1     Running   0          2m30s   10.1.0.8   docker-desktop   <none>           <none>
    dpy-nginx-76f8d594c6-jc628   1/1     Running   0          19m     10.1.0.7   docker-desktop   <none>           <none>
    dpy-nginx-76f8d594c6-p5bq4   1/1     Running   0          2m30s   10.1.0.9   docker-desktop   <none>           <none>
    nginx-pod                    1/1     Running   0          29m     10.1.0.6   docker-desktop   <none>           <none>
    ```

    - 각각의 클러스터 내부 IP가 다름
    - Pod마다 하나씩 IP가 부여

        - 디플로이 조회

            ```
            kubectl get deployment

            NAME        READY   UP-TO-DATE   AVAILABLE   AGE
            dpy-nginx   3/3     3            3           21m
            ```

            - 컨테이너 3개가 조회됨



## 클러스터 외부로 노출시키기

- Pod 조회

    ```
    kubectl get pods

    NAME                         READY   STATUS    RESTARTS   AGE
    dpy-nginx-76f8d594c6-7ksfg   1/1     Running   0          6m21s
    dpy-nginx-76f8d594c6-jc628   1/1     Running   0          23m
    dpy-nginx-76f8d594c6-p5bq4   1/1     Running   0          6m21s
    nginx-pod          
    ```


- `nginx-pod` Pod를 외부로 노출

    ```
    kubectl expose pod nginx-pod --type=NodePort --name=pod-svc --port=80

    service/pod-svc exposed
    ```

        명령어 구성 및 옵션
    - kubectl expose

        - Kubernetes 리소스를 외부에 노출하기 위한 명령어
        - 이 경우, Pod를 노출하여 외부에서 접근할 수 있도록 Service를 생성
 
    - pod nginx-pod

        - 노출 대상이 되는 리소스(Pod)의 이름
        - 여기서는 nginx-pod라는 Pod를 외부에 노출
    
    - --type=NodePort
        
        - Service의 유형을 지정
        - NodePort는 Kubernetes 클러스터 외부에서 노출된 특정 포트(NodePort)를 통해 - Pod에 접근할 수 있도록 설정
 
    - --name=pod-svc
        
        - 생성되는 Service의 이름을 지정
        - 여기서는 pod-svc라는 이름의 Service가 생성
 
    - --port=80
        
        - Service가 클라이언트 요청을 수신할 포트를 지정
        - 클라이언트는 Service의 80번 포트를 통해 Pod에 접근

- Kubernetes 클러스터에서 생성된 Service 목록을 확인하는 명령어

    ```
    kubectl get svc

    NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
    kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP        79m
    pod-svc      NodePort    10.97.174.79   <none>        80:32515/TCP   7m2s
    ```

-   출력 필드 설명
    -   NAME
    
        -   Service의 이름
        -   예: kubernetes, pod-svc.
    -   TYPE
       
        -   Service의 유형
            -   ClusterIP: 클러스터 내부에서만 접근 가능한 IP를 제공(기본값).
            -   NodePort: 클러스터 외부에서도 접근 가능하도록 노드의 포트를 통해 노출.
            -   LoadBalancer: 클라우드 제공자가 제공하는 로드밸런서를 통해 외부에 노출.
            -   ExternalName: 외부 DNS 이름을 서비스 이름에 매핑.
    
    -   CLUSTER-IP
       
        -   클러스터 내부에서 Service에 접근할 수 있는 IP 주소
        -   Service는 이 IP를 통해 Pod와 통신

    -   EXTERNAL-IP
        -   클러스터 외부에서 Service에 접근할 수 있는 IP 주소
        -   NodePort와 LoadBalancer 타입에서 설정되며, <none>이면 외부 노출이 설정되지 않은 상태

    -   PORT(S)
        -   Service가 사용하는 포트
        -   형식: <서비스-포트>:<노드-포트>/<프로토콜>
        -   예: 80:32000/TCP
            -   80: Service가 사용하는 포트.
            -   32000: 외부에서 접근 가능한 NodePort.
            -   TCP: 사용 프로토콜.
    -   AGE
        -   Service가 생성된 이후의 시간



- 로컬 머신에서 포트 32515로 HTTP 요청을 보내고 응답을 확인하는 명령어

    - curl

        - HTTP 요청을 보내고 응답을 확인하는 도구
        - curl은 HTTP GET 요청을 기본으로 수행

    ```
    curl localhost:32515

    <!DOCTYPE html>
    <html>
        <head>
            <title>Welcome to nginx!</title>
            <style>
            html { color-scheme: light dark; }
            body { width: 35em; margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif; }
            </style>
        </head>
        <body>
            <h1>Welcome to nginx!</h1>
            <p>If you see this page, the nginx web server is successfully installed and
            working. Further configuration is required.</p>

            <p>For online documentation and support please refer to
            <a href="http://nginx.org/">nginx.org</a>.<br/>
            Commercial support is available at
            <a href="http://nginx.com/">nginx.com</a>.</p>

            <p><em>Thank you for using nginx.</em></p>
        </body>
    </html>
    ```

- 접속한 화면

    ![alt text](image-3.png)



## 오브젝트 삭제 방법

- svc 조회

    ```
    kubectl get svc

    NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
    kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP        87m
    pod-svc      NodePort    10.97.174.79   <none>        80:32515/TCP   15m
    ```


- 서비스 삭제 

    ```
    kubectl delete service pod-svc
    
    service "pod-svc" deleted
    ```

- 삭제한 서비스 실행해서 확인

    ```
    curl localhost:32515

    curl: (7) Failed to connect to localhost port 32515 after 2254 ms: Could not connect to server
    ```

    - 서버에 연결할 수 없다는 메세지 출력

    ![alt text](image-4.png)


## 포드 삭제

- 디플로이먼트 생성에 의해 만들어진 포드 삭제

    - 포드 조회

        ```
        kubectl get pods

        NAME                         READY   STATUS    RESTARTS   AGE
        dpy-nginx-76f8d594c6-7ksfg   1/1     Running   0          26m
        dpy-nginx-76f8d594c6-jc628   1/1     Running   0          44m
        dpy-nginx-76f8d594c6-p5bq4   1/1     Running   0          26m
        nginx-pod                    1/1     Running   0          54m
        ```

    - 삭제 할 포드 

        - dpy-nginx-76f8d594c6-7ksfg   1/1     Running   0          26m

    - 삭제 명령어 실행

        ```
        kubectl delete pod dpy-nginx-76f8d594c6-7ksfg

        pod "dpy-nginx-76f8d594c6-7ksfg" deleted
        ```

    - 포드 조회

        ```
        kubectl get pods

        NAME                         READY   STATUS    RESTARTS   AGE
        dpy-nginx-76f8d594c6-jc628   1/1     Running   0          45m
        dpy-nginx-76f8d594c6-p5bq4   1/1     Running   0          27m
        dpy-nginx-76f8d594c6-qnwsz   1/1     Running   0          5s
        nginx-pod                    1/1     Running   0          55m
        ```

        - dpy-nginx-76f8d594c6-7ksfg 포드는 삭제됐지만
        - 새로운 포드가 그 자리에 생성

        > 디플로이먼트에 생성된 포드 상태를 유지하려 함

    - 디플로이먼츠 삭제

        - 디플로이먼츠 조회

            ```
            kubectl get deployments

            NAME        READY   UP-TO-DATE   AVAILABLE   AGE
            dpy-nginx   3/3     3            3           48m
            ```

    - 삭제

        ```
        kubectl delete deployment dpy-nginx
        
        deployment.apps "dpy-nginx" deleted
        ```

    - 삭제 됐는지 확인하기 위해 디플로이먼츠 조회

        ```
        kubectl get deployments

        No resources found in default namespace.
        ```

## 매니페스트 (Manifest)        

- 개념
    - Kubernetes의 오브젝트 명세를 파일로 기록한 것.
    - 주로 YAML 형식을 사용하여 작성됨.
    - YAML: Yet Another Markup Language 또는 YAML Ain’t Markup Language의 약자.
- 역할
    - 각 오브젝트에 대해 의도하는 상태(Desired State)를 정의.
    - 이를 오브젝트 스펙(Object Specification)이라고도 함.
    - 파일을 기반으로 Kubernetes에서 오브젝트를 생성, 수정 가능.

