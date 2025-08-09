# 🚀 Induction Program Web App

A full-stack web application built with **React** (frontend), **Node.js / Express** (backend), and **MySQL** (database).  
It includes user authentication, registration, and image fetching from Unsplash.

---

## 📌 Features

- User registration & login (JWT authentication)
- Password hashing for security
- Dynamic toast notifications (`react-toastify`)
- Fetching background images from Unsplash API
- MySQL database integration
- Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend:**
- React
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

**Backend:**
- Node.js
- Express
- MySQL
- bcryptjs
- jsonwebtoken
- dotenv

---

## 📂 Project Structure

project/
│
├── server/ # Express server & APIs
│ ├── routes/ # API route files
│ ├── controllers/ # Route controllers
│ ├── models/ # Database models
│ ├── config/ # DB & env configuration
│ └── server.js # App entry point
│
├── client/ # React app
│ ├── src/
│ │ ├── auth/ # Login & Register pages
│ │ ├── views/ # Main pages
│ │ ├── utils/ # Toast config, helpers
│ │ ├── assets/ # Images & static files
│ │ └── App.js
│ └── package.json
│
├── .gitignore
├── README.md
└── package.json

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/imuhammadessa/admin-panel.git
cd induction-program

2️⃣ Backend setup
cd server
npm install

### Create a .env file inside backend/:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=Database_name
JWT_SECRET=your_secret_key

###  Run backend:
npm start

3️⃣ Frontend setup
cd ../client
npm install

###  Insert UNSPLASH_ACCESS_KEY inside client/register /:
your_unsplash_api_key

###  Run frontend:
npm run dev

🗄 Database Setup
Run the following SQL in MySQL:
CREATE DATABASE induction_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

📸 Screenshots
🏠 Home Page | 🔐 Login | 📝 Register

📜 License
This project is licensed under the MIT License.

✨ Author
Muhammad – Senior Frontend Engineer


