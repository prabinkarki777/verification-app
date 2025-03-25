
# Client

A user verification client built with React, TypeScript, Vite, and Tailwind CSS. This project serves as the frontend for an OTP (One-Time Password) verification application.
[Verification App](https://verification-app-chi.vercel.app/)


## Features

- OTP input form with validation.
- Success page upon successful verification.
- Styled with Tailwind CSS for a responsive and clean design.
- Integrated with backend API for OTP verification (via Axios).
- Custom hooks for handling OTP state and validation.

## Project Structure

```
.
├── README.md                # Project documentation
├── babel.config.js           # Babel configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # Main HTML file
├── jest.config.js            # Jest configuration
├── package-lock.json         # Lock file for dependencies
├── package.json              # Project dependencies and scripts
├── public
│   └── vite.svg              # Vite logo
├── src
│   ├── App.tsx               # Main app component
│   ├── api
│   │   └── apiClient.ts      # Axios API client configuration
│   ├── assets
│   │   └── react.svg         # React logo
│   ├── components
│   │   ├── Form
│   │   │   └── VerificationForm.tsx  # OTP form component
│   │   ├── icons
│   │   │   └── Logo.tsx      # Logo component
│   │   └── ui
│   │       ├── Button.tsx    # Custom button component
│   │       ├── InputOTP.tsx  # OTP input field component
│   │       └── Spinner.tsx   # Loading spinner component
│   ├── hooks
│   │   └── useVerificationCode.ts  # Custom hook for OTP verification
│   ├── index.css             # Global styles
│   ├── main.tsx              # Entry point for the React app
│   ├── pages
│   │   ├── Home.tsx          # Home page
│   │   └── Success.tsx       # Success page after OTP verification
│   ├── services
│   │   └── verificationService.ts  # Service to handle verification logic
│   ├── styles
│   │   └── global.css        # Tailwind CSS setup and custom styles
│   ├── utils
│   │   ├── cn.ts             # Utility for className manipulation
│   │   ├── errorHandler.ts   # Error handler utility
│   │   └── isMobile.ts       # Utility to check if device is mobile
│   └── vite-env.d.ts         # TypeScript declarations for Vite
├── test
│   ├── __mocks__
│   │   └── fileMock.ts       # File mock for testing
│   ├── component
│   │   └── Button.test.tsx   # Button component test
│   ├── jest.setup.ts         # Jest setup file
│   ├── services
│   │   └── verificationService.test.ts  # Tests for verification service
│   └── utils
│       ├── cn.test.ts        # Tests for cn utility
│       └── isMobile.test.tsx # Tests for isMobile utility
├── tsconfig.app.json         # TypeScript configuration for app
├── tsconfig.json             # Base TypeScript configuration
├── tsconfig.node.json        # TypeScript configuration for Node.js
└── vite.config.ts            # Vite configuration
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/client.git
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   This will start the app locally at `http://localhost:3000`.

4. Build for production:

   ```bash
   npm run build
   ```

5. Preview the production build:

   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run lint:fix`: Fixes any linting issues automatically.
- `npm run format`: Formats the codebase using Prettier.
- `npm run test`: Runs tests using Jest (covers basic testing).
- `npm run prepare`: Initializes Husky for pre-commit hooks.

## Testing

This project includes some basic tests using Jest and React Testing Library. To run the tests, execute:

```bash
npm run test
```

These tests cover some key components and utilities, including:

- Button component
- `cn` utility for class names
- `isMobile` utility
- Verification service logic
