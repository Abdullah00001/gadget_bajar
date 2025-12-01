# Gadget Bajar – Setup Steps

## 1. Clone the repository

Clone the Gadget Bajar project into your local machine.

## 2. Create a `.env` file

Add all required environment variables:

```
    DATABASE_URL=postgresql://root:root@postgresql:5432/gadget_bajar?schema=public
    NODE_ENV=development
    PORT=5000
    REDIS_URL=redis://redis:6379
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=abdullahbinomarchowdhury02@gmail.com

    SMTP_PASS=uhorumnkqkgqftts
    JWT_ACCESS_TOKEN_SECRET_KEY=
    OTP_HASH_SECRET=
    GROQ_API_KEY=
```

## 3. Ensure Docker & Docker Compose are installed

Install Docker Engine + Docker Compose on your system.

## 4. Start all services

Run the following command:

```
docker-compose up --build
```

## 7. Apply database migrations

```
docker compose exec server npx prisma migrate dev
docker compose exec server npx prisma generate
npx prisma migrate dev (for local)
npx prisma generate (for local)
```

---

# Gadget Bajar API Documentation

## Auth Endpoints

| Route          | Method | Description          |
| -------------- | ------ | -------------------- |
| `/auth/signup` | POST   | User registration    |
| `/auth/verify` | POST   | Verify user with OTP |
| `/auth/login`  | POST   | User login           |

## Chat Bot

| Route      | Method | Description             |
| ---------- | ------ | ----------------------- |
| `/chatbot` | POST   | Send message to chatbot |

## Order

| Route    | Method | Description      |
| -------- | ------ | ---------------- |
| `/order` | POST   | Create new order |

## Payment

| Route                     | Method | Description            |
| ------------------------- | ------ | ---------------------- |
| `/payment/webhook/stripe` | POST   | Stripe payment webhook |

## Admin

| Route              | Method | Description         |
| ------------------ | ------ | ------------------- |
| `/admin/order/:id` | PATCH  | Update order status |

## Health Check

| Route     | Method | Description         |
| --------- | ------ | ------------------- |
| `/health` | GET    | Server health check |

## Notification

| Route         | Method | Description                     |
| ------------- | ------ | ------------------------------- |
| `/socket.io/` | GET    | Socket.IO connection with token |

---

### Run the server on local machine then via postman first signup then login then copy the jwt token,the go to the project on vs code and open scripts folder and paste the jwt token on testSocket.js file token object literal open another terminal and run node ./scripts/tstSocket.js

its will create a connection with server

now when webhook api or admin change order status its will show the live notifications
