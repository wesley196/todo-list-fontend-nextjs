# Todo List Frontend

A modern Next.js todo list application that consumes a Laravel REST API with Sanctum token-based authentication.

## Features

- 🔐 User authentication (Register, Login, Logout)
- ✅ Create, read, update, and delete todos
- 🔍 Search todos by title and description
- 🏷️ Filter todos by status (All, Pending, Completed)
- 📄 Pagination (5 items per page)
- 🎨 Clean and responsive UI
- 🛡️ Protected routes with authentication

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- The **Laravel Todo API** running locally on `http://localhost:8000`

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd todolist/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json`.

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Or create `.env.local` manually with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Make sure:**
- The Laravel API is running on `http://localhost:8000`
- The frontend is configured to use the same API URL

### Step 4: Verify API is Running

Before starting the frontend, ensure your Laravel backend is running:

```bash
# In your Laravel project directory
php artisan serve
```

It should be accessible at `http://localhost:8000`.

### Step 5: Start the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`.

### Step 6: Open in Browser

Navigate to:

```
http://localhost:3000
```

You will be redirected to the login page.

## Usage

### First Time Setup

1. **Create an Account**
   - Click "Sign up" link on the login page
   - Fill in: Full Name, Email, Password, Confirm Password
   - Click "Sign up" button
   - You'll be automatically logged in and redirected to todos page

2. **Login**
   - Enter your email and password
   - Click "Sign in" button
   - You'll be redirected to your todos dashboard

### Using the App

1. **Create a Todo**
   - Click the "Create Todo" button
   - Fill in the title (required) and description (optional)
   - Click "Create" button

2. **Search Todos**
   - Use the search bar to find todos by title or description
   - Results update in real-time

3. **Filter Todos**
   - Use the dropdown menu to filter by:
     - All Todos
     - Pending (incomplete)
     - Completed

4. **Mark Todo as Complete**
   - Click the checkbox next to a todo to toggle completion status

5. **Delete a Todo**
   - Click the "Delete" button on a todo item
   - Confirm the deletion

6. **Pagination**
   - Navigate between pages at the bottom of the todo list
   - 5 todos per page

7. **Logout**
   - Click the "Logout" button in the top-right corner
   - You'll be redirected to the login page

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm run start

# Run linter
npm run lint
```

## Project Structure

```
frontend/
├── app/
│   ├── (authenticated)/       # Protected routes
│   │   └── todos/
│   │       └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Alert.tsx
│   ├── TodoItem.tsx
│   ├── TodoModal.tsx
│   ├── FilterBar.tsx
│   └── Pagination.tsx
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts
│   └── useTodos.ts
├── context/                   # React Context for state management
│   └── AuthContext.tsx
├── lib/
│   ├── api/                   # API client services
│   │   ├── authService.ts
│   │   ├── todoService.ts
│   │   └── client.ts
│   └── types/
│       └── index.ts           # TypeScript types
├── .env.local                 # Environment variables (create this)
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

### Issue: "Cannot connect to API"

**Solution:**
- Make sure the Laravel API is running on `http://localhost:8000`
- Check `.env.local` has the correct `NEXT_PUBLIC_API_URL`
- Ensure CORS is enabled in your Laravel backend
- Check browser console (F12) for error messages

### Issue: "Login fails with 401"

**Solution:**
- Verify credentials are correct
- Try creating a new account
- Check Laravel API logs for errors
- Clear browser cache and try again

### Issue: "Blank page or buttons not showing"

**Solution:**
- Clear cache: `rm -rf .next`
- Restart dev server: `npm run dev`
- Hard refresh browser: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

Then restart: `npm run dev`

## API Endpoints Used

This frontend consumes the following Laravel API endpoints:

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Todos

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `GET /api/todos/{id}` - Get specific todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo

For detailed API documentation, see the Laravel backend README.

## Technology Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** CSS with Tailwind CSS
- **State Management:** React Context + Custom Hooks
- **HTTP Client:** Fetch API
- **Authentication:** Token-based (Bearer token)

## Notes

- All todos are user-specific (each user can only see their own todos)
- Authentication tokens are stored in localStorage
- The app is fully responsive and works on mobile devices
- Search and filtering work on the client-side for better performance

## Support

For issues or questions, check the browser console (F12) for error messages and make sure:

1. The Laravel API is running
2. `.env.local` is configured correctly
3. You're using a supported Node.js version

---

**Happy todo-ing!** 🚀
