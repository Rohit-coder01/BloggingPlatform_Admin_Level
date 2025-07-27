✨ Blog — A Modern Full-Stack Blogging Platform
Welcome to Blog, a feature-rich and modern blogging platform designed for seamless content sharing and management. It enables public users to browse, read, and engage with blog posts, while providing a powerful admin interface for managing content.

Built using a React frontend and a Node.js + Express backend, this application is fully backed by MongoDB for reliable data storage and retrieval.

🚀 Key Features
👤 Public Users:
📰 Browse and read blogs with a clean, responsive layout
🔍 Filter blogs by category or search keywords
👥 User registration and login for a personalized experience
📱 Fully responsive — optimized for desktop, tablet, and mobile devices

🛠 Admin Panel:
✏️ Create, edit, and delete blog posts via a rich admin interface
🖼 Upload featured images with real-time preview support
📊 Access a secure and elegant admin dashboard
🔐 Admin authentication via secure JWT tokens

🧰 General:
🎨 Integrated React Quill rich text editor
🌐 Built with modular and maintainable React components
💾 File/image upload support (using Multer or similar backend tool)
⚡ Optimized for speed and SEO
🎯 Scalable architecture using REST APIs

🖼 UI Snapshots
Click on the links below to view sample screenshots from the live platform:

## 📸 Screenshots

### 🏠 Homepage (Logged in as Admin)
![Admin Home](screenshot/Screenshot%202025-07-27%20203104.png)

### 📊 Admin Dashboard
![Admin Dashboard](screenshot/Screenshot%202025-07-27%20203114.png)

### 🙅 User Dashboard Restriction (Not an Admin)
![Restricted Dashboard for User](screenshot/Screenshot%202025-07-27%20203700.png)

🔄 Replace the above links with actual screenshots hosted on GitHub, Cloudinary, Imgur, or your own domain.

🏗 Tech Stack
Frontend
React
React Router
Tailwind CSS
Axios
React Quill
Lucide Icons
Backend
Node.js
Express.js
Mongoose
MongoDB Atlas
Authentication & Security
JWT (JSON Web Token)

Bcrypt for password hashing
Middleware for route protection

📁 Folder Structure (Simplified)
bash
Copy
Edit
/client
  ├── /src
  │   ├── /components
  │   ├── /pages
  │   ├── /services
  │   └── App.jsx

/server
  ├── /controllers
  ├── /routes
  ├── /models
  ├── /middlewares
  └── index.js

  🛠 Setup Instructions
bash
Copy
Edit
# Clone the repo
git clone https://github.com/your-username/modern-blog-platform

# Navigate to server and install dependencies
cd server
npm install

# Start backend server
npm run dev

# Open another terminal for frontend
cd ../client
npm install
npm run dev

🔒 Authentication Flow
New users and admins register/login using /auth endpoints

Tokens stored securely and verified with middleware

Protected routes include /admin, /create-post, /dashboard

