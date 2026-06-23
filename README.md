# CodeMaster - Programming Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Convex-0x0A0A0A?style=for-the-badge&logoColor=white" alt="Convex">
</p>

An interactive programming learning platform with courses, coding challenges, and progress tracking. Built for aspiring developers in Kenya and beyond.

![CodeMaster Preview](https://via.placeholder.com/800x400/6366F1/FFFFFF?text=CodeMaster+Learning+Platform)

## Features

### Learning Features
- **Interactive Courses** - Structured learning paths from beginner to advanced
- **Coding Challenges** - Hands-on practice with real-time feedback
- **Progress Tracking** - Visual progress indicators and achievements
- **Code Editor** - In-browser code execution environment

### User Features
- **User Authentication** - Secure login and registration
- **Personal Dashboard** - Track your learning journey
- **Bookmarks** - Save favorite lessons for later
- **Certificates** - Earn certificates upon course completion

### Content Management
- **Course Categories** - Organized by programming language and skill level
- **Lesson Types** - Video, text, and interactive content
- **Quizzes** - Test knowledge with automated grading

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS |
| Backend | Convex (Serverless) |
| Database | Convex |
| Auth | JWT Authentication |
| Code Execution | In-browser sandbox |

## Getting Started

### Prerequisites
- Bun 1.3+

### Installation

```bash
# Clone the repository
git clone https://github.com/garymike07/codemaster.git

# Navigate to project directory
cd codemaster

# Install dependencies
bun install

# Set up Convex
bunx convex dev
```

### Environment Setup

```env
VITE_CONVEX_URL=your_convex_url
```

### Running the Project

```bash
# Development
bun run dev

# Build
bun run build
```

## Course Categories

- **Web Development** - HTML, CSS, JavaScript, React
- **Mobile Development** - React Native
- **Backend Development** - Node.js, Python
- **Data Science** - Python, Machine Learning
- **DevOps** - Git, Docker, AWS

## Project Structure

```
codemaster/
├── convex/            # Backend functions
│   ├── auth.ts      # Authentication
│   ├── courses.ts   # Course management
│   └── progress.ts  # User progress
├── src/
│   ├── components/  # UI components
│   ├── pages/      # Page components
│   ├── hooks/      # Custom hooks
│   └── lib/        # Utilities
└── public/          # Static assets
```

## API Endpoints

### Authentication
- `signup` - Create account
- `login` - Authenticate
- `getCurrentUser` - Get user profile

### Courses
- `getCourses` - List all courses
- `getCourseById` - Get course details
- `getLessons` - Get course lessons

### Progress
- `updateProgress` - Mark lesson complete
- `getUserProgress` - Get user's progress
- `awardCertificate` - Generate certificate

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

- **Author**: Gary Mike

---

<p align="center">
  Learn to Code. Build Your Future.
</p>
