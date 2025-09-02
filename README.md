# FIRMABLE Frontend

A modern Next.js frontend application for managing Australian Business Number (ABN) records and names.

## Features

- **ABN Records Management**: View, search, and filter ABN records
- **ABN Names Management**: Manage business names, trading names, and legal names
- **Advanced Search**: Real-time search across all fields
- **Type-based Filtering**: Filter names by type (TradingName, BusinessName, LegalName, Other)
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Built with Tailwind CSS and Lucide React icons

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **Headless UI** - Accessible UI components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

## API Integration

The frontend connects to the backend API at `http://localhost:3000/api/v1`. Make sure your backend server is running before starting the frontend.

### Available Endpoints

- **ABN Records**: `/api/v1/abn-records`
- **ABN Names**: `/api/v1/abn-names`

## Features Overview

### ABN Records Table

- **Search**: Search by ABN, legal name, organisation name, or ACN
- **Filters**: Filter by status, entity type, and state
- **Sorting**: Sort by any column (ABN, name, status, last updated)
- **Pagination**: Navigate through large datasets
- **Actions**: View, edit, and delete records

### ABN Names Table

- **Type Filtering**: Quick filter buttons for each name type
- **Search**: Search by name or ABN
- **Advanced Filters**: Filter by specific ABN, sort options
- **Entity Information**: Shows related ABN record details
- **Visual Indicators**: Icons and colors for different name types

### Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Easy to use on tablets and phones
- **Accessible**: Proper ARIA labels and keyboard navigation

## Component Structure

```
src/
├── app/
│   └── page.tsx              # Main page component
├── components/
│   ├── AbnRecordsTable.tsx   # ABN records table
│   └── AbnNamesTable.tsx     # ABN names table
├── lib/
│   ├── api.ts               # API service functions
│   └── utils.ts             # Utility functions
└── types/
    └── index.ts             # TypeScript type definitions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Code formatting (if configured)

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new components
3. Add proper error handling
4. Test on multiple screen sizes
5. Ensure accessibility compliance

## License

ISC
