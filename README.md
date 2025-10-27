# 🚀 MERN Stack Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations, image uploads, comments, and more.

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Protected routes
- Role-based access control (Admin/User)

### 📝 Blog Management

- Create, read, update, and delete blog posts
- Rich text editor for post content
- Featured image uploads
- Categories and tags
- Post publishing/unpublishing

### 🔍 Advanced Features

- Search functionality
- Pagination
- Comments system
- Post views counter
- Responsive design
- Image optimization

### 🛡️ Security

- Password encryption
- Input validation
- Rate limiting
- XSS protection
- Secure file uploads

## 🏗️ Project Structure

mern-blog/
├── client/ # React front-end
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API services
│ │ ├── context/ # React context providers
│ │ └── utils/ # Utility functions
├── server/ # Express.js back-end
│ ├── config/ # Configuration files
│ ├── controllers/ # Route controllers
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware
│ ├── uploads/ # Uploaded files
│ └── utils/ # Utility functions
└── README.md

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-Edrisabdella.git
   cd mern-stack-integration-Edrisabdella
1. Backend Setup

cd server
npm install

### Create server .env file

cp .env.example .env

Edit .env with your configurations

1. Frontend Setup  
cd ../client
npm install

### Create .env file

cp .env.example .env

1. Environment Variables

Server (.env)
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mernblog
JWT_SECRET=mongodb+srv://edrisabdella178_db_user:<db_password>@cluster0.zmfeu2j.mongodb.net/?appName=Cluster0
JWT_EXPIRE=90d
CLIENT_URL=<http://localhost:5173>

Client (.env)
VITE_API_URL=<http://localhost:5000/api>

1. Run the Application

## Start backend (from server directory)

npm run dev

## Start frontend (from client directory, new terminal)

npm run dev

1. Access the Application

Frontend: <http://localhost:5173>

Backend API: <http://localhost:5000/api>

📚 API Documentation
Authentication Endpoints

🛠️ Technologies Used
Frontend
React 18 - UI library

React Router DOM - Routing

Axios - HTTP client

React Hook Form - Form management

React Quill - Rich text editor

Lucide React - Icons

Vite - Build tool

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM

JWT - Authentication

bcryptjs - Password hashing

Multer - File uploads

Express Validator - Input validation

Security
Helmet - Security headers

CORS - Cross-origin resource sharing

Express Rate Limit - Rate limiting

Input sanitization - XSS protection

🎯 Key Features Implementation
User Authentication
JWT tokens for stateless authentication

Protected routes on both frontend and backend

Password encryption with bcrypt

Automatic token refresh

Blog Post Management
Rich text editor for content creation

Image upload with Multer

Slug generation for SEO-friendly URLs

Category and tag system

Draft and publish states

Advanced Functionality
Real-time search with regex

Pagination for better performance

Comment system with user associations

View count tracking

Responsive mobile-first design

👨‍💻 Developer
Edris Abdella
📍 Dire Dawa, Ethiopia
📧 <edrisabdella178@gmail.com>
📱 +251944676746 | +251905131051

Connect with me:
LinkedIn

GitHub

Project Repository

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

🐛 Troubleshooting
Common Issues

Getting Help
If you encounter any issues:

Check the console for error messages

Ensure all environment variables are set

Verify all dependencies are installed

Check the MongoDB connection

🚀 Deployment
Backend Deployment (Heroku/Railway)
Set environment variables in deployment platform

Ensure MongoDB Atlas connection string is correct

Update CORS settings for production URL

Frontend Deployment (Vercel/Netlify)
Build the project: npm run build

Set environment variables in deployment platform

Update API URL for production

Built with ❤️ using the MERN Stack

❤️ This complete MERN stack blog application includes all the features requested in the assignment:

✅ **Task 1: Project Setup** - Complete project structure with environment configuration
✅ **Task 2: Back-End Development** - RESTful API with Express.js, MongoDB, validation, and error handling
✅ **Task 3: Front-End Development** - React components with routing, state management, and hooks
✅ **Task 4: Integration and Data Flow** - API services, state management, forms with validation
✅ **Task 5: Advanced Features** - Authentication, image uploads, pagination, search, comments
