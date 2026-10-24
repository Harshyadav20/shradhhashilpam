# ProGod Assets - Full Stack Video Editing Assets Store

A modern, full-stack e-commerce platform for video editing assets including meme packs, sound effects, glitch transitions, and more.

## 🚀 Features

### Frontend
- Modern, responsive design with animated gradients
- Glass morphism UI effects
- Real-time asset filtering and search
- User authentication (login/register)
- Shopping cart functionality
- Contact form
- SEO optimized

### Backend API
- RESTful API with Express.js
- MongoDB database integration
- JWT-based authentication
- User management
- Asset CRUD operations
- Order processing
- Contact form submissions
- Secure password hashing with bcrypt

### Database Models
- **User**: Authentication and user profiles
- **Asset**: Video editing products
- **Order**: Purchase history and transactions
- **Review**: Product ratings and comments
- **Contact**: Customer support messages

## 📁 Project Structure

```
/workspace
├── public/
│   └── index.html          # Main frontend application
├── server/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── assetController.js
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── assetRoutes.js
│   │   ├── orderRoutes.js
│   │   └── contactRoutes.js
│   ├── models/             # Mongoose models (also in /models)
│   ├── package.json
│   └── index.js            # Server entry point
├── models/
│   ├── User.js
│   ├── Asset.js
│   ├── Order.js
│   ├── Review.js
│   └── Contact.js
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: HTML5, TailwindCSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Payments**: Stripe integration ready
- **Email**: Nodemailer ready

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd /workspace
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Create environment file**
   ```bash
   cp ../.env.example .env
   ```

4. **Configure environment variables**
   Edit `.env` file with your:
   - MongoDB connection string
   - JWT secret
   - Stripe API keys (optional)
   - Email credentials (optional)

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Open the frontend**
   Open `public/index.html` in your browser or serve it with a static server.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/update` - Update user profile (protected)

### Assets
- `GET /api/assets` - Get all assets (with filters)
- `GET /api/assets/:id` - Get single asset
- `POST /api/assets` - Create asset (protected)
- `PUT /api/assets/:id` - Update asset (protected)
- `DELETE /api/assets/:id` - Delete asset (protected)
- `POST /api/assets/:id/download` - Increment download count

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `POST /api/orders/:id/complete` - Complete order (protected)

### Contact
- `POST /api/contact` - Submit contact form

## 🔐 Environment Variables

See `.env.example` for all required environment variables:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` - Email configuration
- `CLIENT_URL` - Frontend URL for CORS

## 🎨 Customization

The frontend features a stunning dark theme with:
- Animated gradient backgrounds
- Neon text effects
- Glass morphism cards
- Smooth hover animations
- Responsive design for all devices

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 👨‍💻 Author

**Harsh Yadav** - Founder of ProGod Assets

---

Made with ❤️ for video editors everywhere
