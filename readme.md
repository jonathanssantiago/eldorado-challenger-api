# 📡 Device Management API

This is the backend for the device management application. The API is built using **Node.js**, **Express**, **Prisma ORM**, **MySQL**, and **TypeScript**.

## Development Environment Setup with Self-Signed Certificates

### Context

The backend API uses a self-signed certificate for HTTPS connections during development. This may cause security warnings in browsers and API clients. Here's how to configure your system to use the frontend normally while trusting the backend certificate.

---

### 1. Browser Configuration (Frontend Access)

When accessing the frontend that connects to the backend with a self-signed certificate:

- URL BACKEND AWS: http://ec2-54-162-90-177.compute-1.amazonaws.com/health

#### **Google Chrome/Chromium**

1. Navigate to the backend URL: http://ec2-54-162-90-177.compute-1.amazonaws.com/health
2. Click **"Advanced"** > **"Proceed to [site] (unsafe)**
3. _(Optional)_ Type `thisisunsafe` anywhere on the page to bypass immediately

#### **Mozilla Firefox**

1. Click **"Advanced"**
2. Select **"Accept the Risk and Continue"**

#### **Microsoft Edge**

1. Click **"Details"**
2. Choose **"Go on to the webpage"**

#### **Safari**

1. Click **"Show Details"**
2. Select **"Visit this website"**

---

## ✅ Features

- ✅ **CRUD** for **Categories**
- ✅ **CRUD** for **Devices**
- ✅ Validation using **DTOs**
- ✅ **Swagger Documentation** available at `/api/docs`
- ✅ Integration with **MySQL** via **Prisma ORM**
- ✅ Ready for use with **Docker**

---

## 📦 Technologies Used

- [Node.js (LTS)](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Swagger](https://swagger.io/tools/swagger-ui/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker (optional)](https://www.docker.com/)

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/jonathanssantiago/eldorado-challenger-api.git
cd eldorado-challenger-api


```
