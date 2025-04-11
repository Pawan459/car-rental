# Bolttech Carental Frontend

This is the frontend application for the Bolttech Carental system. It is built with Next.js 15 using the new App Router, Tailwind CSS for styling, and React for interactive UI components. The frontend communicates with a separate Express backend via RESTful APIs for user authentication, car search, and booking management.

## Features

- **User Authentication:**  
  Users can sign up and log in. JWT tokens are used to secure API calls.
- **Car Search:**  
  Users can search for available cars by specifying start and end dates.
- **Booking Management:**  
  Authenticated users can view their bookings and create new bookings.
- **Responsive UI:**  
  Styled with Tailwind CSS for a clean, modern look.
- **Component-based Architecture:**  
  Reusable components are built as interactive islands for optimal performance.

## Prerequisites

- Node.js (v20 or later)
- pnpm or yarn
- A running backend API (see the backend README for setup instructions)

## Setup

1. **Clone and Install Dependencies:**

   ```bash
   cd frontend
   pnpm install
   # or using yarn:
   # yarn install
   ```

2. **Configure Environment Variables:**

   Create a `.env.local` file in the frontend root with, for example:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

   This variable is used to direct API calls to your backend server.

3. **Run the Development Server:**

   ```bash
   pnpm run dev
   # or using yarn:
   # yarn dev
   ```

   The application will run at [http://localhost:3000](http://localhost:3000).

4. **Build for Production:**

   Build and start the application with:

   ```bash
   pnpm run build
   pnpm start
   ```

## API Communication

The frontend uses a central API service class to make calls to the backend. Examples of available API calls include:

- **Login:** POST request to `/api/auth/login` with email and password.
- **Register:** POST request to `/api/auth/register` with email, name, and password.
- **Get a Car by ID:** GET request to `/api/cars/<carId>`.
- **My Bookings:** GET request to `/api/bookings` (with JWT in the header).
- **Book a Car:** POST request to `/api/bookings` with booking details (with JWT in the header).
- **Available Cars:** GET request to `/api/cars` with `startDate` and `endDate` as query parameters.

All API calls use the base URL specified in the `NEXT_PUBLIC_API_URL` environment variable.

## Frontend UI Overview

- **Global Layout:**  
  The application uses a common layout that includes a header and footer for navigation.
- **Authentication Pages:**  
  Separate sign-in and registration pages that use reusable form components.
- **Car Search Page:**  
  The home page offers a car search form (an interactive client component) along with a list of available cars.
- **Booking Pages:**  
  - A page to display the logged-in user’s bookings.
  - A page to create a new booking through an interactive form.

## Additional Notes

- Tailwind CSS is used for styling; all global styles are defined in `globals.css`.
- The application adheres to an islands architecture, separating interactive client components from static server-rendered content.
- For improved security, consider using HTTP-only cookies rather than localStorage for storing JWT tokens in production.
- Ensure the backend API is running and reachable from the frontend based on your configured `NEXT_PUBLIC_API_URL`.

Happy Coding!
