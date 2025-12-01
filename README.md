# Student Course Tracker

A full-stack web application for managing students, courses, and grades built with React, Node.js, Express, and MySQL.

**Course:** SOEN 387 - Fall 2025  
**Institution:** Concordia University

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Student Management**: View all students and their enrolled courses
- **Course Management**: Browse courses with enrollment statistics
- **Enrollment System**: Enroll students in courses
- **Grade Management**: Assign and update letter grades (A+, A, A-, B+, B, B-, C+, C, C-, D+, D, F)
- **Dashboard Analytics**: 
  - Real-time statistics
  - Grade distribution charts
  - Enrollment trends
  - Course analytics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL 8.1
- TypeScript

### Frontend
- React 19
- TypeScript
- Redux Toolkit (RTK Query)
- React Router
- TailwindCSS
- shadcn/ui components
- Recharts (data visualization)

### DevOps
- Docker & Docker Compose
- phpMyAdmin (database management)

## 📦 Prerequisites

Make sure you have the following installed on your system:

- **Docker Compose** (version 2.0 or higher)
- **Git**

> **Note:** No need to install Node.js, MySQL, or npm separately - Docker will handle everything!

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd student-course-tracker
```

### 2. Create Environment Files

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=student_course_tracker
DB_PORT=3306
```

Create a `.env` file in the `frontend` directory:

```bash
cp frontend/.env.example frontend/.env
```

The `frontend/.env` file should contain:

```env
VITE_API_URL=http://localhost:4000
```

## 🏃 Running the Application

### Start All Services

From the root directory, run:

```bash
docker-compose up --build
```

This command will:
- Build and start the MySQL database
- Build and start the backend API server
- Build and start the frontend development server
- Start phpMyAdmin for database management
- Initialize the database with sample data

### First Time Setup

The first time you run the application, Docker will:
1. Download necessary images (MySQL, Node.js)
2. Install all dependencies
3. Build the containers
4. Initialize the database with sample data (30 students, 5 courses, and enrollments)

This process may take 5-10 minutes depending on your internet connection.

### Access the Application

Once all services are running, you can access:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **phpMyAdmin**: http://localhost:8080
  - Username: `root`
  - Password: `root`

### Stop the Application

To stop all services:

```bash
docker-compose down
```

To stop and remove all data (including the database):

```bash
docker-compose down -v
```

## 📁 Project Structure

```
student-course-tracker/
├── backend/
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── db.ts          # Database connection
│   │   ├── server.ts      # Express server setup
│   │   └── logger.ts      # Request logging
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/           # RTK Query API slices
│   │   ├── app/           # Redux store & routing
│   │   ├── components/    # Reusable UI components
│   │   ├── hook/          # Custom React hooks
│   │   ├── view/          # Page components
│   │   └── main.tsx       # Application entry point
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── db_init/
│   └── student_course_tracker.sql  # Database schema & seed data
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔌 API Endpoints

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create new course

### Enrollments
- `GET /enrollments` - Get all enrollments
- `POST /enrollments` - Enroll a student in a course
- `PUT /enrollments` - Update student's grade
- `GET /enrollments/course/:id/grades` - Get all grades for a course
- `GET /enrollments/student/:id/courses` - Get all courses for a student
- `GET /enrollments/courses/:id/students` - Get all students in a course

## 🐛 Troubleshooting

### Port Already in Use

If you get port conflict errors:

```bash
# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Frontend (change 3000 to 3001)
  - "4001:4000"  # Backend (change 4000 to 4001)
  - "3307:3306"  # MySQL (change 3306 to 3307)
  - "8081:80"    # phpMyAdmin (change 8080 to 8081)
```

### Database Connection Issues

If the backend can't connect to the database:

1. Wait a few seconds for MySQL to fully start
2. Check MySQL container logs:
```bash
docker-compose logs db
```

### Frontend Not Loading

If the frontend shows a blank page:

1. Check if the API is running: http://localhost:4000
2. Check browser console for errors
3. Verify the `VITE_API_URL` in `frontend/.env`

### Reset Everything

To start fresh:

```bash
docker-compose down -v
docker-compose up --build
```

## 📝 Sample Data

The application comes pre-loaded with:
- **30 students** (Alice Smith, Bob Johnson, etc.)
- **5 courses** (CS101-CS105)
- **Multiple enrollments** with random grades

## 👨‍💻 Development

### Running in Development Mode

The application is already configured for development with:
- Hot Module Replacement (HMR) for frontend
- Automatic server restart on backend changes
- Volume mounting for live code updates

### View Logs

```bash
docker-compose logs -f

docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

## 📄 License

This project is for educational purposes as part of SOEN 387 coursework at Concordia University.

## 🙋 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review Docker logs
3. Verify environment variables are correctly set

---

**Built with ❤️ for SOEN 387 - Fall 2025**