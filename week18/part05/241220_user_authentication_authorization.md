# 사용자 인증 및 보안 구현

## 1. CORS 정책 설정
- src/settings.ts에서 .env 값을 불러와 CORS_ALLOWED_ORIGIN 설정.
- .env에서 CORS_ALLOWED_ORIGIN 값을 설정해 특정 URL에서만 요청 허용.
- Express 앱에서 cors 패키지를 사용해 origin과 credentials 옵션으로 CORS 설정.

    ```typescript
    import dotenv from "dotenv";
    dotenv.config();
    export const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN || "";

    // .env
    CORS_ALLOWED_ORIGIN=http://localhost:3000
    ```

    ```typescript
    import cors from "cors";
    import { CORS_ALLOWED_ORIGIN } from "./settings";

    app.use(
    cors({
        origin: CORS_ALLOWED_ORIGIN,
        credentials: true,
    })
    );
    ```

## 2. 비밀번호 해싱 및 검증 (bcrypt)
- bcrypt를 사용해 비밀번호 해싱 및 검증.
- hash로 비밀번호를 암호화하고, compare로 검증 수행.
    ```javascript
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // 비밀번호 저장
    });

    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // 일치 여부 확인
    });
    ```

## 3. 사용자 생성 – Router
- 사용자 생성 시 중복 이메일 확인, 중복 시 409 (Conflict) 반환.
- 성공 시 201 (Created) 상태 반환.

    ```javascript
    router.post("/users", async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.create({ email, password });
    } catch (error) {
        if (isQueryError(error) && error.code === "ER_DUP_ENTRY") {
        return res.sendStatus(409);
        }
        throw error;
    }
    res.sendStatus(201);
    });
    ```

## 4. 사용자 로그인 – Router
- 로그인 요청에서 이메일, 비밀번호 추출 후 DB 매칭.
- 성공 시 JWT를 생성하고 쿠키에 저장.
- NODE_ENV에 따라 쿠키 secure 및 sameSite 설정.
    ```javascript
    import jwt from "jsonwebtoken";

    router.post("/login", async (req, res) => {
    const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "14d" });
    res.cookie("access-token", accessToken, {
        sameSite: NODE_ENV === "development" ? "lax" : "none",
        secure: NODE_ENV !== "development",
    });
    res.sendStatus(204);
    });
    ```

## 5. 사용자 인증 – Middleware
- JWT 검증을 통해 사용자 인증 수행.
- 쿠키에 access-token이 없거나 검증 실패 시 401 (Unauthorized) 반환.

    ```javascript
    import jwt from "jsonwebtoken";

    export async function authenticateUser(req, res, next) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.sendStatus(401);
    }
    // JWT 유효성 검사 및 사용자 정보 획득
    req.user = user;
    next();
    }
    ```

## 6. 사용자 인가 – Router
- 특정 리소스에 대한 접근 권한 확인.
- authenticateUser로 인증된 사용자가 해당 리소스 소유자인지 검증.
    ```javascript
    import { authenticateUser } from "../middlewares/authentication";
    import { authorizeNote } from "../middlewares/authorization";

    router.get("/notes/:id", authenticateUser, authorizeNote, async (req, res) => {
    const note = req.note;
    res.json(note);
    });
    ```