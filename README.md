# Machine Test for MERN Stack Developers

## for the Task Objective refer Notes.md


## Admin Task Distribution System

---

## 📌 Project Overview

This is a full-stack **MERN application** built as part of a **Machine Test**.

The application allows an **Admin** to:

- Login securely using **JWT authentication**
- Create and manage agents
- Upload **CSV / Excel** files containing tasks
- Automatically distribute tasks equally among **5 agents**
- View distributed tasks on the dashboard

The system follows clean architecture principles with proper **validation**, **error handling**, and **secure APIs**.

---

## 🔐 Admin Credentials (For Testing)

```text
Email: admin@example.com
```

```text
Password: Admin@123
```

---

⚠️ **If the admin does not exist in the database**, register once using the **Register API** (via Postman) before login.

### Register API

```http
POST -> http://localhost:5000/api/auth/register
```

```Body
Body :
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "Admin@123"
}
```

---

## ✨ Features

### 1️⃣ Admin Authentication

- Email & Password login
- JWT-based authentication
- Protected dashboard routes
- Secure logout functionality

---

### 2️⃣ Agent Creation

Admin can create agents with the following details:

- Name
- Email
- Mobile Number (with country code, e.g., `+91XXXXXXXXXX`)
- Password

✔️ Validations ensure correct format and uniqueness.

---

### 3️⃣ CSV / Excel Upload & Task Distribution

#### ✅ Supported File Formats

- `.csv`
- `.xls`
- `.xlsx`

---

#### 📄 Required Columns in File

| Column Name | Required    |
| ----------- | ----------- |
| FirstName   | ✅ Yes      |
| Phone       | ✅ Yes      |
| Notes       | ✅ Yes      |

---

### 🔄 Distribution Logic

- Tasks are distributed **equally among 5 agents**
- If tasks are not divisible by 5, remaining tasks are distributed **sequentially (round-robin)**
- Assigned tasks are stored in **MongoDB**
- Dashboard displays tasks along with assigned agent details

---

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Multer (File Upload)
- XLSX (CSV/Excel Parsing)

### Frontend

- React.js
- Axios
- React Router

---

## 🚀 Setup & Running the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mahboob-Attar/Agent-Task-Allocation-Service
```

---

## ⚙️ Backend Setup

Navigate to the `server` folder:

```bash
cd server
```

```bash
npm install
```

## Create a .env file inside the server folder:

```text
PORT=5000
MONGO_URI=your_mongodb_connection_string (replace with ur connection)
JWT_SECRET=your_super_secret_key
```

### MongoDB Configuration

**MongoDB Atlas** is the recommended database for this project to ensure a consistent and reproducible environment.
If you choose to use a **local MongoDB** instance, the same code will work without modification.  
Update the MongoDB connection string in the `.env` file accordingly:
MONGO_URI=your_mongodb_connection_string

```bash
npm run dev
```

## 🎨 Frontend Setup

Open a new terminal and navigate to the client folder:

```bash
cd client
```

```bash
npm install
```

```bash
npm start
```

## ▶️ How to Use the Application

1. Start both backend and frontend
2. Open [http://localhost:3000](http://localhost:3000) (frontend -> localhost)
3. Login using the admin credentials
4. Create **5 agents**
5. Upload a CSV/Excel file containing tasks
6. View distributed tasks on the dashboard

---

## ✅ Validation & Error Handling

The application properly handles:

- Invalid login credentials
- Unauthorized route access
- Invalid file type uploads
- Incorrect CSV format
- Missing required columns
- Less than 5 agents during task distribution
- Invalid mobile number format

All errors are displayed clearly on the frontend.

---

## 📂 Sample Dataset

👉 **Sample CSV / Excel File:**  
[https://drive.google.com/your-sample-dataset-link-here](https://docs.google.com/spreadsheets/d/1rlLrvba14D4J2mj_WoFGRvwYgmeVud9D/edit?usp=sharing&ouid=110590591404665099929&rtpof=true&sd=true)

---

## 🎥 Project Demo

👉 **Demo Video Link:**  
[https://drive.google.com/your-project-demo-link-here](https://drive.google.com/file/d/1qB7tXJfJpT9a90aVjVQ4JD6Xj8fWU65V/view?usp=sharing)

---

