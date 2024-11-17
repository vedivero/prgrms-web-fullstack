
# 장바구니 목록

## 장바구니 목록 요구 사항

1. 사용자가 장바구니에 담은 내역을 확인
2. 선택한 도서 아이템의 수량과 가격 합계를 표시
3. 장바구니 담은 도서 아이템을 삭제
4. 각 도서 아이템을 선택하여 주문서 작성


---

## Cart 컴포넌트

역할: 장바구니의 전체 뷰를 담당하며, 상품 목록, 주문 요약, 주문하기 버튼 등의 UI를 렌더링

- 주요 함수 및 Hook 사용

    - `useCart`
        - 서버에서 장바구니 데이터를 가져오고(fetchCart), 항목을 삭제하는(deleteCart) 로직을 캡슐화.
        - 컴포넌트는 데이터 로직을 분리하고 데이터의 상태를 쉽게 관리.

    - `useState\`
        - 선택된 항목(체크박스)의 id를 저장하고, 상태 변경을 처리.

    - `useMemo`
        - Cart 컴포넌트


- 함수 설명

    - handleCheckItem:
        - 체크박스를 클릭했을 때 선택된 항목의 상태를 업데이트.
        - checkedItems 배열에 추가하거나 제거.
    - handleOrder:
        - 선택된 항목을 바탕으로 주문 데이터를 생성.
        - 주문을 위한 데이터를 React Router의 navigate를 사용해 /order 페이지로 전달.



---

## CartItem 컴포넌트

역할: 장바구니에 담긴 개별 상품의 UI를 렌더링하며, 삭제 및 선택 기능을 제공.

- 주요 함수

    - `handleCheck`
        - 개별 체크박스를 클릭할 때 부모로부터 전달된 onCheck 함수를 호출.
    - handleDelete:
        - 삭제 버튼 클릭 시 삭제 여부를 확인한 후 부모 컴포넌트로 전달된 onDelete 호출.


--

## CheckIconButton 컴포넌트
역할: 체크박스를 아이콘 형태로 구현.

- isChecked 값에 따라 아이콘을 `<FaRegCheckCircle>` 또는 `<FaRegCircle>`로 표시.
- 클릭 이벤트가 발생하면 부모에서 전달된 onCheck 호출.


--

## CartSummary 컴포넌트
역할: 장바구니에 담긴 총 수량과 금액을 요약하여 표시.

- 주요 Props

        totalQuantity: 체크된 항목의 총 수량.
        totalPrice: 체크된 항목의 총 금액.