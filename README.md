# Security Update Dashboard

A comprehensive, real-time dashboard for monitoring and analyzing global security conflicts and political violence incidents.

## Dashboard Preview

[security-update-dashboard.webm](https://github.com/user-attachments/assets/118610f7-c6d9-4509-8df7-f48900543083)

## Live Website

Please register and log into the live website: https://security-update-dashboard.vercel.app/login

## 🌟 Features

### 📊 **Interactive Dashboard**

- **Global Overview**: Summary cards with total conflicts, casualties, and intensity metrics
- **Regional Analysis**: Dedicated pages for Middle East, Europe, Asia Pacific, Africa, and Americas
- **Real-time Data**: Dynamic filtering and search capabilities

### 🗺️ **Geospatial Visualization**

- **Interactive Maps**: Leaflet-based conflict mapping with OpenStreetMap integration
- **Region-specific Centering**: Automatic map positioning based on selected region
- **Intensity-based Markers**: Color-coded pins (Red=High, Yellow=Medium, Green=Low)
- **Popup Details**: Click markers for conflict information and statistics

### 🔍 **Advanced Data Management**

- **Smart Filtering**: Filter by region, conflict intensity, and type
- **Full-Text Search**: Search across countries, conflict types, and descriptions
- **Multi-column Sorting**: Sort by country, region, intensity, date, or casualties
- **Pagination**: Configurable rows per page (5, 10, 20, 50, 100) with smart navigation

### 📱 **Modern UX/UI**

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional Styling**: Tailwind CSS with clean, accessible interface
- **Type Safety**: Full TypeScript implementation
- **Authentication**: Secure login system with route protection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/duokobia/security-update-dashboard.git
   cd security-update-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```

security-update-dashboard/
├── .husky/                         # Git hooks directory
│   ├── _/                         # Husky internal scripts
│   │   └── husky.sh
│   ├── pre-commit                 # Pre-commit hook
│   └── commit-msg                 # Commit message hook (optional)
├── app/                           # Next.js app directory
│   ├── (marketing)/               # Public pages
│   │   ├── page.tsx               # → / (landing page)
│   │   └── features/
│   │       └── page.tsx           # → /features
│   ├── (auth)/                    # Authentication
│   │   ├── login/
│   │   │   └── page.tsx           # → /login
│   │   └── register/
│   │       └── page.tsx           # → /register
│   └── (app)/                     # Main application
│       └── dashboard/
│           ├── layout.tsx         # Dashboard layout
│           ├── page.tsx           # → /dashboard (overview)
│           ├── conflicts/
│           │   ├── page.tsx       # → /dashboard/conflicts
│           │   └── [region]/
│           │       └── page.tsx   # → /dashboard/conflicts/africa
│           └── analytics/
│               └── page.tsx       # → /dashboard/analytics
├── components/                    # Reusable components
│   ├── DashboardLayout.tsx       # Main layout wrapper
│   ├── ConflictMap.tsx           # Interactive map component
│   └── UI/                       # Additional UI components
├── lib/                          # Utilities and data
│   └── mockData.ts               # Conflict dataset
├── public/                       # Static assets
├── types/                        # TypeScript definitions
├── .eslintrc.json                # ESLint configuration (or eslint.config.mjs)
├── .prettierrc                   # Prettier configuration
├── .prettierignore               # Prettier ignore patterns
├── commitlint.config.js          # Commit message validation (optional)
├── lint-staged.config.js         # lint-staged configuration (optional)
└── package.json                  # Project dependencies and scripts

```

## 🎯 Key Components

### ConflictMap Component

Interactive Leaflet map with:

- Region-based auto-centering
- Intensity-based marker styling
- Popup information windows
- Responsive design

### Data Table Features

- **Sortable Columns**: Click headers to sort ascending/descending
- **Advanced Filtering**: Combine region and intensity filters
- **Live Search**: Real-time text search across multiple fields
- **Pagination**: Navigate large datasets efficiently

### Regional Pages

Each region page includes:

- Region-specific conflict mapping
- Filtered conflict listings
- Intensity-based color coding
- Detailed conflict information

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for configuration:

```env
# Optional: Mapbox token for alternative mapping
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### Customizing Data

Edit `lib/mockData.ts` to:

- Add new conflict entries
- Modify existing data
- Update regional statistics
- Extend time series data

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Key customization points:

- **Colors**: Modify `tailwind.config.js` for brand colors
- **Components**: Update component classes in `/components`
- **Layout**: Adjust responsive breakpoints as needed

### Adding New Regions

1. Add region to `ConflictData.zone` type
2. Update region coordinates in `ConflictMap.tsx`
3. Create new page in `app/[region]/`
4. Update filter options in data table

## 📊 API Integration (Future)

The dashboard is designed for easy API integration:

```typescript
// Example API integration point
const fetchLiveData = async () => {
  const response = await fetch('/api/conflicts');
  return response.json();
};
```

## 🛠️ Development Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
npm run type-check   # TypeScript validation
```

## 📋 TODO & Roadmap

- [ ] **Real-time Data Integration** - Connect to live conflict APIs
- [ ] **Advanced Analytics** - Add charts and trend analysis
- [ ] **User Management** - Role-based access control
- [ ] **Export Functionality** - PDF/Excel report generation
- [ ] **Mobile App** - React Native companion app
- [ ] **Notification System** - Alert for new conflicts
- [ ] **Historical Data** - Conflict timeline visualization

## 🙏 Acknowledgments

- **OpenStreetMap** for free map tiles
- **Leaflet** for interactive mapping
- **Next.js** for React framework
- **Tailwind CSS** for styling utilities
