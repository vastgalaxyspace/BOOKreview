````markdown
# 📚 Book Review REST API

A simple backend system built with **Node.js**, **Express**, and **MongoDB** that allows users to register, login, add books, view books, submit reviews, and more. JWT-based authentication ensures secure access to protected endpoints.

---

## 🛠️ Project Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/booksdb
JWT_SECRET=your_jwt_secret_key
```

### 4. Start MongoDB Locally (if not using Atlas)

```bash
mongod
```

### 5. Start the Server

```bash
npm run dev
```

> The server should now be running at: `http://localhost:5000`

---

## 📂 Project Structure

```
project-root/
│
├── controller/
│   ├── usercontroller.js
│   ├── bookcontroller.js
│   └── reviewcontroller.js
│
├── middleware/
│   └── authmiddleware.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review.js
│
├── router/
│   ├── userrouter.js
│   └── booksrouter.js
│
├── config/
│   └── connect.js
│
├── .env
├── server.js
└── README.md
```

---

## 🔐 Authentication

### ✅ Register

```bash
POST /auth/register
```

**Body:**

```json
{
  "username": "john123",
  "email": "john@example.com",
  "password": "mypassword"
}
```

### 🔓 Login

```bash
POST /auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "mypassword"
}
```

> On success, returns a **JWT Token** to be used in the `Authorization: Bearer <token>` header.

---

## 📘 Book Endpoints

### ➕ Add Book (Auth Required)

```bash
POST /books/add
Authorization: Bearer <token>
```

**Body:**

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "publishedYear": 2018
}
```

### 📚 Get All Books (Pagination & Filters)

```bash
GET /books/getall?page=1&limit=10&author=James&genre=Self-help
```

### 🔍 Search Books

```bash
GET /books/search?query=atomic
```

### 📖 Get Book by ID (With Reviews)

```bash
GET /books/get/:id
```

---

## ✍️ Review Endpoints

### ✨ Submit Review (1 per user per book, Auth Required)

```bash
POST /books/:id/review
Authorization: Bearer <token>
```

**Body:**

```json
{
  "rating": 5,
  "comment": "Excellent book on habits!"
}
```

### ♻️ Update Review

```bash
PUT /books/updatereview/:reviewId
```

### ❌ Delete Review

```bash
DELETE /books/deletereview/:reviewId
```

---

## ⚙️ Design Decisions & Assumptions

* One user can submit only **one review per book** (enforced with Mongoose index).
* Authentication handled via **JWT** tokens.
* `Book.findById(id)` includes reviews for that book.
* Pagination uses `skip` and `limit` for efficient results.
* Partial, **case-insensitive** search implemented using regex on `title` and `author`.

---

## 🗃️ Database Schema

### 🔐 Users

```js
{
  username: String,
  email: String,
  password: String (hashed)
}
```

### 📘 Books

```js
{
  title: String,
  author: String,
  genre: String,
  publishedYear: Number
}
```

### 📝 Reviews

```js
{
  bookId: ObjectId (ref: 'Book'),
  userId: ObjectId (ref: 'User'),
  rating: Number,
  comment: String
}
```

> Indexed on `{ bookId, userId }` to enforce **1 review per user per book**:

```js
ReviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });
```

---

## 🧪 Example API Request with `curl`

### Register

```bash
curl -X POST http://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"john","email":"john@example.com","password":"pass123"}'
```

### Add Book

```bash
curl -X POST http://localhost:5000/books/add \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"title":"Clean Code","author":"Robert Martin","genre":"Programming","publishedYear":2008}'
```

---

## 📌 Notes

* Ensure MongoDB is running or use MongoDB Atlas.
* Replace `<your_token>` in requests with your actual JWT token.
* Use Postman or Thunder Client for easier API testing.

---

## 📬 Contact

For questions or contributions, reach out to [Your Name](mailto:your.email@example.com).

```

---

Let me know if you'd like the README formatted for GitHub with badges, a license, or a live deployment guide (like on Render or Railway).
```
