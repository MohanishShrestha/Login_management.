# Login management system(Backend)


## 🔐 Login Management System
A complete user login and management system built with Node.js, Express, and MongoDB Atlas, including features like user registration, email verification, login, profile update, password management, and admin-level user controls.


## 🧰 Tech Stack
  Language: JavaScript (Node.js)
  Backend Framework: Express.js
  Database: MongoDB Atlas
  Auth: JWT (JSON Web Tokens)
  API Testing: Postman


## 📁 Features

### ✅ 1. Register
Data Fields: fullName, email, password, dob, gender, role (admin | customer | superAdmin)

Process:

Save user to MongoDB

Send email verification token

✅ 2. Email Verification
Token verification via Postman

Extract _id from token

Set isVerified: true

✅ 3. Login
Input: email, password

Validations:

Email exists

Email is verified

Password matches

Output:

JWT token with user _id

✅ 4. My Profile
Pass token in Postman

Middleware: isAuthenticated

Fetch user by _id from token

✅ 5. Update Profile
Token required

Route protected by isAuthenticated

Update user fields and respond

✅ 6. Update Password
Token + Old & New Password in body

Validate old password

Hash new password & update

✅ 7. Forgot & Reset Password
Forgot:

Post email

Validate existence

Send token in reset link

Reset:

Post new password and token

Validate token and update password

✅ 8. Delete User (Only SuperAdmin)
Role-based access

Token required

Only superAdmin can delete users

✅ 9. Read All / Specific Users
Access allowed for admin and superAdmin

Role checked via middleware

🔐 Authorization Middleware
Middleware: isAuthenticated

Checks JWT token validity

Extracts user _id

Role Handling:

user: no access to read users

admin: can read users

superAdmin: can read + delete users

Unauthorized attempts return status 403

🔢 API Response Codes
Code	Meaning
200	OK (read, delete)
201	Created / Updated
400	Bad request
401	Unauthorized (token invalid/expired)
403	Forbidden (authenticated but not allowed)
404	Not found
409	Conflict (duplicate email, etc.)

🌐 MongoDB Atlas Setup
Visit MongoDB Atlas
Sign up / Sign in
Create a cluster
Add your username/password
Get the connection string
Use it in your project (e.g., .env file)

🚀 Running the App
🔧 Install Dependencies
      ```npm install```

▶️ Start Server
     ```npm run dev```

📂 Folder Structure
project-root/
├── src/
│   ├── connectToDb/
│   │   └── connectToMongoDb.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── pageNotFound.js
│   ├── Router/
│   │   ├── randomRouter.js
│   │   └── webRouter.js
│   ├── constant.js
├── index.js


#🧪 Example Postman Usage
Register: POST /web/register

Verify Email: GET /web/verify-email?token=<jwt>

Login: POST /web/login

My Profile: GET /web/me with Bearer <token>

Update Profile: PATCH /web/update-profile

Update Password: PATCH /web/update-password

Forgot Password: POST /web/forgot-password

Reset Password: POST /web/reset-password

Read All Users: GET /web/users

Delete User: DELETE /web/user/:id


