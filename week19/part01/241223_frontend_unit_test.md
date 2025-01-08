# 백엔드 단위 테스트 구현 정리

## 1. 사용자 인터페이스(UI) 테스트 개요
- 목적: JoinForm 컴포넌트의 동작을 검증하는 테스트 코드 작성.
- 테스트 항목:
    - HTML 요소들이 정상적으로 렌더링되는지 확인.
    - 회원가입 버튼 클릭 시 onSubmit 콜백 호출 여부 확인.
    - 로그인 링크 클릭 시 /login URL로 이동 여부 확인.
    - 비밀번호와 비밀번호 확인이 일치하지 않을 경우 alert 메시지 발생 여부.

## 2. 라이브러리 설치 및 설정
- 필요한 라이브러리:
    - @testing-library/jest-dom
    - @testing-library/react
    - @testing-library/user-event
- 설정:
    - jest의 모듈 이름 매핑 설정을 package.json에 추가.
```json
"jest": {
  "moduleNameMapper": {
    "^@/(.+)": "<rootDir>/src/$1"
  }
}
```

## 3. Mocking 설정
- 렌더링 Mock:
    - src/utils/test/renderWithRouter.ts에서 renderWithRouter 함수 작성.

        ```typescript
        import { render } from "@testing-library/react";
        import { BrowserRouter } from "react-router-dom";

        export function renderWithRouter(ui: React.ReactElement, { route = "/" } = {}) {
        window.history.pushState({}, "Test page", route);
        render(ui, { wrapper: BrowserRouter });
        }
        ```
- Browser 이벤트 Mock:
    - src/setupTests.ts에서 window.alert를 Mock 처리.
        ```typescript
        Object.defineProperty(window, "alert", {
        writable: true,
        value: jest.fn(),
        });
        ```
## 4. Test Suite 작성
- 파일 위치: src/components/JoinForm.test.tsx
- 주요 테스트 케이스:
    - JoinForm이 정상적으로 렌더링 되는지 확인.
    - 사용자 정보 입력 후 회원가입 버튼 클릭 시 onSubmit 콜백 호출.
    - 로그인 링크 클릭 시 /login 경로로 이동 여부 확인.
    - 비밀번호와 비밀번호 확인이 다를 경우 alert 호출 여부 검증.

## 5. 테스트 코드 예시
```typescript
import { fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "@/utils/test/renderWithRouter";
import { JoinForm } from "./JoinForm";

describe("JoinForm", () => {
  test("잘 렌더링된다.", () => {
    renderWithRouter(<JoinForm />);
    expect(screen.getByLabelText("이메일", { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호", { selector: "input" })).toBeInTheDocument();
    expect(screen.getByText("회원가입", { selector: "button" })).toBeInTheDocument();
  });

  test("회원정보 입력 후 회원가입 버튼 클릭 시 onSubmit 콜백 호출", () => {
    const onSubmit = jest.fn();
    renderWithRouter(<JoinForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText("이메일"), { target: { value: "foo@example.com" } });
    fireEvent.change(screen.getByLabelText("비밀번호"), { target: { value: "1234" } });
    fireEvent.change(screen.getByLabelText("비밀번호 확인"), { target: { value: "1234" } });
    
    screen.getByText("회원가입", { selector: "button" }).click();
    expect(onSubmit).toBeCalledWith({ email: "foo@example.com", password: "1234" });
  });

  test("로그인하기 버튼 클릭 시 로그인 URL로 이동", () => {
    renderWithRouter(<JoinForm />);
    fireEvent.click(screen.getByText("로그인하기"));
    expect(window.location.pathname).toBe("/login");
  });

  test("비밀번호 불일치 시 alert 호출 및 onSubmit 콜백 미호출", () => {
    const alertSpy = jest.spyOn(window, "alert");
    const onSubmit = jest.fn();
    renderWithRouter(<JoinForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText("이메일"), { target: { value: "foo@example.com" } });
    fireEvent.change(screen.getByLabelText("비밀번호"), { target: { value: "1234" } });
    fireEvent.change(screen.getByLabelText("비밀번호 확인"), { target: { value: "5678" } });
    
    screen.getByText("회원가입", { selector: "button" }).click();
    expect(alertSpy).toBeCalledWith("비밀번호가 일치하지 않습니다.");
    expect(onSubmit).not.toBeCalled();
  });
});
```
## 6. 구현할 코드
- 테스트용 Mock 파일:
    - src/utils/test/renderWithRouter.ts
    - src/setupTests.ts
- 테스트 케이스:
    - src/components/JoinForm.test.tsx (JoinForm과 동일한 디렉토리 내)
- 테스트 대상 코드:
    - src/components/JoinForm.tsx

## 7. 테스트 실행
- 명령어:
    - 일반 테스트: ${PROJECT_ROOT}/frontend에서 npm test 실행.
    - CI 환경에서 테스트: CI=true npm test 실행.

## 8. Makefile을 활용한 테스트 자동화
- Makefile 작성: Backend의 Makefile과 유사한 방식으로 재사용성 확보.
- Makefile 예시:
    ```Makefile
    all:
    cat ./Makefile

    test:
    CI=true npm test
    ```
## 9. 추가 테스트 구현 계획
- Component 단위 테스트:
    - JoinForm과 유사한 방식으로 다른 컴포넌트도 테스트.
    - Backend에서 사용한 MOCK_USERS 방식 차용.
- 테스트 범위 정의:
    - 테스트 케이스는 많을수록 좋음.
- 다른 영역 테스트:
    - API, hooks, pages 등 다양한 부분 테스트.
    - UI가 포함된 E2E 테스트 범위 및 한계 설정 필요.