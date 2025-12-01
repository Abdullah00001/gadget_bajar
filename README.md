# Gadget Bajar"

🔗 **Live Demo:** [https://gadget-bajar.onrender.com](https://gadget-bajar.onrender.com)

🔗 **Postman Collection:** [https://drive.google.com/file/d/1rQNtvYVD01BXWnmIsEFCWSaNQIx6al4T/view?usp=sharing](https://drive.google.com/file/d/1rQNtvYVD01BXWnmIsEFCWSaNQIx6al4T/view?usp=sharing)

## Clone the Repository

```bash
https://github.com/Abdullah00001/gadget_bajar.git
cd gadget_bajar
```

## Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
# Database
DATABASE_URL="postgresql://root:root@postgresql:5432/gadget_bajar"

# App
NODE_ENV=production
PORT=5000

# Redis
REDIS_URL="redis://redis:6379"

# SMTP / Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=demo_email@example.com
SMTP_PASS=demo_smtp_password_here

# JWT / Auth
JWT_ACCESS_TOKEN_SECRET_KEY=demo_jwt_secret_key_123456789
OTP_HASH_SECRET=demo_otp_hash_secret_key_987654321

# External APIs
GROQ_API_KEY=gsk_demo_api_key_123456789

```

## Installation

This project uses Docker Compose for consistent development environments across all machines. Docker is **required** to run this application.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** (version 20.10 or higher)
  - [Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Install Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Install Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)
- **Node.js** (version 18.x or higher) - for local development tools only

## Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Run in development mode with nodemon |
| `npm run build` | Compile TypeScript to JavaScript     |
| `npm run start` | Start production server              |
| `npm run lint`  | Lint code with ESLint                |
| `npm run test`  | Run unit and integration tests       |
| `prisma:generate`  | Run unit and integration tests       |
| `prisma:migrate`  | Run unit and integration tests       |

## Install Dependencies

```bash
npm install
```

## Start the Application with Docker Compose

```bash
docker-compose up --build
```
---

## Gadget Bajar API Documentation

## Auth Endpoints

| Route          | Method | Description          |
| -------------- | ------ | -------------------- |
| `/auth/signup` | POST   | Only User registration    |
| `/auth/login`  | POST   | User & Admin login           |

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
| `/payment/webhook/paypal` | POST   | Paypal payment webhook |

## Admin

| Route              | Method | Description         |
| ------------------ | ------ | ------------------- |
| `/admin/order/:id` | PATCH  | Update order status |
| `/admin/order` | GET  | Get all orders |

## Health Check

| Route     | Method | Description         |
| --------- | ------ | ------------------- |
| `/health` | GET    | Server health check |


---

## Webhook Testing Steps
since bangladesh didn't have paypal and stripe thats why i cant get the sandbox,thats why i mock webhooks.

- first open postman and import given postman collection you can found at the top of readme
- then create an account
- then login
- then create an order.order endpoint response will have webhook payload,copy the payload 
- then in payment folder you will found stripe and paypal webhook in body just paste the copied payload and send the request.

its will complete the payment