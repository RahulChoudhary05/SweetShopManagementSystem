# Sweet Shop Management System - Backend API

RESTful API for the Sweet Shop Management System built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Role-based access control (User/Admin)
- Complete CRUD operations for sweets
- Search and filter functionality
- Inventory management (purchase/restock)
- Error handling and validation
- Security best practices

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env` file:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Configure environment variables in `.env`

4. Start the server:
\`\`\`bash
# Development
npm run dev

# Production
npm start
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Sweets
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets by name, category, price range
- `GET /api/sweets/:id` - Get single sweet
- `POST /api/sweets` - Create sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)

### Inventory
- `POST /api/sweets/:id/purchase` - Purchase sweet (Protected)
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## Testing

Run tests:
\`\`\`bash
npm test
\`\`\`

## License

MIT
