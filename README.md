# Sweet Shop Management System

A comprehensive full-stack application for managing a sweet shop, built with React.js, Node.js, Express, and MongoDB.

## Features

### User Features
- Browse sweet catalog with beautiful product cards
- Search and filter sweets by name, category, and price range
- Purchase sweets (with authentication)
- User dashboard with activity tracking
- Secure authentication with JWT

### Admin Features
- Complete inventory management
- Add, update, and delete sweets
- Restock functionality
- Admin dashboard with statistics
- Real-time stock monitoring

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Vite** - Lightning-fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configure environment variables in \`.env\`:
\`\`\`env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
\`\`\`

5. Seed the database:
\`\`\`bash
cd scripts
node seed-database.js
\`\`\`

6. Start the server:
\`\`\`bash
cd ..
npm run dev
\`\`\`

The backend API will be available at \`http://localhost:5000\`

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configure environment variables:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at \`http://localhost:3000\`

## Test Accounts

After seeding the database, you can use these accounts:

**Admin Account:**
- Email: admin@sweetshop.com
- Password: admin123

**User Account:**
- Email: user@sweetshop.com
- Password: user123

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/me\` - Get current user (Protected)

### Sweets
- \`GET /api/sweets\` - Get all sweets
- \`GET /api/sweets/search\` - Search sweets
- \`GET /api/sweets/:id\` - Get single sweet
- \`POST /api/sweets\` - Create sweet (Admin only)
- \`PUT /api/sweets/:id\` - Update sweet (Admin only)
- \`DELETE /api/sweets/:id\` - Delete sweet (Admin only)

### Inventory
- \`POST /api/sweets/:id/purchase\` - Purchase sweet (Protected)
- \`POST /api/sweets/:id/restock\` - Restock sweet (Admin only)

## Project Structure

\`\`\`
SweetShopManagementSystem/
├── backend/                 # Backend API
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Express server
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context
│   │   └── utils/          # Utility functions
│   └── index.html          # HTML entry point
│
├── scripts/                # Database scripts
│   └── seed-database.js    # Seed script
│
└── README.md               # Project documentation
\`\`\`

## Features Highlights

### Beautiful UI Design
- Soft, elegant color scheme perfect for a sweet shop
- Modern, responsive design that works on all devices
- Smooth animations and transitions
- High-quality placeholder images
- Professional typography and spacing

### Secure Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (User/Admin)
- Protected routes and API endpoints

### Robust Backend
- RESTful API architecture
- MongoDB with Mongoose ODM
- Comprehensive error handling
- Request validation
- Logging system

### Professional Frontend
- Component-based architecture
- Custom hooks for reusable logic
- Context API for state management
- Client-side routing
- Form validation

## Development

### Backend Development
\`\`\`bash
cd backend
npm run dev
\`\`\`

### Frontend Development
\`\`\`bash
cd frontend
npm run dev
\`\`\`

## Production Build

### Backend
\`\`\`bash
cd backend
npm start
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm run build
npm run preview
\`\`\`

## Testing

Run backend tests:
\`\`\`bash
cd backend
npm test
\`\`\`

## My AI Usage

### AI Tools Used
This project was developed with the assistance of AI coding tools, specifically v0 by Vercel.

### How AI Impacted My Workflow

**Planning & Architecture:**
- AI helped structure the project following the provided folder structure
- Generated a comprehensive implementation plan with proper task breakdown
- Ensured best practices for full-stack development

**Code Generation:**
- AI generated boilerplate code for Express routes, controllers, and middleware
- Created React components following modern best practices
- Implemented authentication logic with JWT and bcryptjs
- Built responsive UI components with Tailwind CSS

**Problem Solving:**
- AI provided solutions for CORS configuration
- Helped implement proper error handling patterns
- Suggested security best practices for production deployment

**Code Quality:**
- AI ensured consistent code formatting and naming conventions
- Generated comprehensive comments and documentation
- Implemented proper TypeScript/JSDoc annotations

**Learning & Best Practices:**
- AI explained MongoDB schema design patterns
- Demonstrated React hooks and context API usage
- Showed proper separation of concerns in full-stack architecture

### Reflection

Using AI as a development partner significantly accelerated the development process while maintaining code quality. The AI helped me focus on business logic and features rather than spending time on boilerplate code. It also introduced me to modern best practices I might not have been aware of, such as proper error handling patterns and security implementations.

However, I still needed to:
- Review and understand all generated code
- Make architectural decisions
- Test the application thoroughly
- Customize the UI/UX based on requirements
- Debug and fix integration issues

AI served as an intelligent coding assistant, but the final implementation, testing, and deployment decisions were made by me.

## License

MIT

## Support

For support, email support@sweetshop.com or open an issue in the repository.
\`\`\`

---

Built with ❤️ using React, Node.js, and MongoDB
