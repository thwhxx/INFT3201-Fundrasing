# McLaughlin University Fundraising System

A comprehensive fundraising management system for McLaughlin University built with Next.js and PostgreSQL. This system helps track donors, programs, donations, and fundraising targets across multiple campus locations.

## Features

- Donor management (individuals, foundations, corporations)
- Program categorization (energy research, education research, undergraduate, graduate)
- Donation tracking
- Quarterly target monitoring
- Multi-campus support
- Committee member management
- Performance reporting

## Technology Stack

- **Frontend**: Next.js 14
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Language**: TypeScript
- **Styling**: Custom CSS

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/thwhxx/INFT3201-Fundrasing
   cd mclaughlin-fundraising
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create `.env` file:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=inft3201_db
   DB_USER=inft3201_admin
   NODE_ENV=development
   PORT=3000
   ```

   Create `.env.local` for sensitive data:

   ```env
   DB_PASSWORD=your_password_here
   ```

4. **Database Setup**

   ```bash
   # Connect to PostgreSQL and create database
   psql -U postgres
   CREATE DATABASE inft3201_db;
   CREATE USER inft3201_admin WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE inft3201_db TO inft3201_admin;
   ```

5. **Run database tests**

   ```bash
   npm run test-db
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
mclaughlin-fundraising/
├── src/
│   ├── app/              # Next.js pages and API routes
│   │   ├── api/          # API endpoints
│   │   └── ...          # Frontend pages
│   ├── components/       # React components
│   ├── lib/             # Utilities and database connection
│   └── types/           # TypeScript type definitions
├── public/              # Static files
├── database/           # Database schema and migrations
└── ...
```

## Database Schema

- **donors**: Stores donor information
- **programs**: Tracks university programs
- **committee_members**: Manages committee member data
- **donations**: Records all donations
- **quarterly_targets**: Tracks fundraising goals

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run test-db` - Test database connection
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## Team

- Adam Leblanc
- Anh Thu Huynh (Tracy)
- Cort Auger
- Jung Hwa Hyun
- Shah Bano

## License

[Your chosen license]

## Acknowledgments

- Prof. Ghafouri Bakhsh, Fara
- McLaughlin University
