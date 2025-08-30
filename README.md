# Movie Explorer Dashboard

A comprehensive React movie discovery application built with modern web technologies and design patterns.

## 🚀 Features

### Core Features
- **Movie Search**: Search movies with real-time debounced input (300ms delay)
- **Advanced Filtering**: Filter by release year with dropdown selection
- **Pagination**: Navigate through movie results with Previous/Next controls
- **Movie Details**: Click any movie to view detailed information in a modal
- **Favorites System**: Add/remove movies from favorites with persistent storage
- **Analytics Dashboard**: Visual charts showing genre distribution and decade analysis
- **Dark/Light Theme**: Toggle between themes with persistent preference

### Technical Features
- **Error Boundaries**: Graceful error handling with recovery options
- **Lazy Loading**: Code splitting for optimal performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton screens and spinners for better UX
- **Query Caching**: Smart API caching with TanStack Query

## 🏗️ Architecture & Design Patterns

### 1. Container-Presentational Pattern
- **Custom Hooks**: `useMovies`, `useFavorites`, `useDebouncedSearch` handle all business logic
- **Components**: Focus purely on UI presentation and user interactions
- **Separation**: Clear distinction between data fetching and UI rendering

### 2. Factory Pattern
- **ChartFactory**: Dynamically creates different chart types (Bar/Pie charts)
- **Extensible**: Easy to add new chart types without modifying existing code

### 3. Observer Pattern (Redux)
- **Global State**: Redux Toolkit manages favorites and UI state
- **Reactive Updates**: Components automatically re-render when state changes
- **Pub-Sub**: State changes notify all subscribed components instantly

### 4. Custom Hooks Pattern
- **useDebouncedSearch**: Debounces user input to prevent excessive API calls
- **useMovies**: Encapsulates movie fetching logic with caching and error handling
- **useFavorites**: Manages favorite movies with localStorage persistence

## 📁 Project Structure

```
DOUBLEDOTS-TASK/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── CustomHooks/
│   │   │   ├── useDebouncedSearch.js
│   │   │   ├── useFavorites.js
│   │   │   └── useMovies.js
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── ChartComponent.jsx
│   │   │   ├── ChartFactory.jsx
│   │   │   ├── FavoritesDashboard.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieModal.jsx
│   │   │   └── SearchBar.jsx
│   │   └── Redux/
│   │       └── Slices/
│   │           ├── favoritesSlice.jsx
│   │           └── uiSlice.jsx
│   ├── store.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-explorer-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get OMDb API Key**
   - Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
   - Sign up for a free API key
   - Copy your API key

4. **Configure API Key**
   - Open `src/components/CustomHooks/useMovies.js`
   - Replace `YOUR_OMDB_API_KEY` with your actual API key:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open the application**
   - Navigate to `http://localhost:3000`
   - Start exploring movies!

## 🎯 Usage Guide

### Searching Movies
1. Use the search bar on the homepage
2. Type movie names - search is debounced for performance
3. Results update automatically as you type

### Filtering Results
1. Use the "Release Year" dropdown in the filter panel
2. Select a specific year or "All Years"
3. Results update immediately

### Adding Favorites
1. Click the heart icon on any movie card
2. Red heart = added to favorites
3. Gray heart = not in favorites
4. Favorites persist across browser sessions

### Viewing Movie Details
1. Click on any movie card
2. Modal opens with detailed information
3. Add/remove from favorites directly in the modal
4. Click X or outside modal to close

### Analytics Dashboard
1. Click "Favorites" in the navigation
2. View genre distribution pie chart
3. See movies by decade bar chart
4. Browse your favorite movies collection

## 🔧 Technical Implementation

### State Management
- **Redux Toolkit**: Global state for favorites and UI preferences
- **React Query**: Server state management with caching
- **LocalStorage**: Persistent favorites and theme preference

### Performance Optimizations
- **Debounced Search**: Prevents excessive API calls
- **Query Caching**: Reduces duplicate network requests
- **Lazy Loading**: Code splitting for faster initial load
- **Memoized Computations**: Optimized chart data calculations

### Error Handling
- **Error Boundaries**: Catches JavaScript errors in components
- **Query Error States**: Graceful handling of API failures
- **Retry Mechanisms**: Automatic retry for failed requests
- **User Feedback**: Clear error messages with recovery options

## 🎨 Design System

### Color Scheme
- **Light Mode**: Clean whites and grays with blue accents
- **Dark Mode**: Rich dark grays with warm accent colors
- **Interactive Elements**: Consistent hover and active states

### Components
- **Cards**: Hover effects with scale and shadow transitions
- **Buttons**: Consistent styling across primary/secondary actions
- **Modals**: Backdrop blur with smooth animations
- **Charts**: Color-coded with responsive sizing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build first
npm run build

# Deploy build folder to Netlify
```

## 📈 Future Enhancements

### Planned Features
- **Advanced Filters**: Genre, rating, director filtering
- **Infinite Scrolling**: Replace pagination with infinite scroll
- **Movie Recommendations**: AI-powered suggestions based on favorites
- **User Reviews**: Add personal ratings and reviews
- **Watch Lists**: Multiple custom lists beyond favorites
- **Social Features**: Share favorites with friends

### Technical Improvements
- **PWA Support**: Offline functionality with service workers
- **Unit Testing**: Comprehensive test coverage with Jest/RTL
- **E2E Testing**: Cypress integration testing
- **Performance Monitoring**: Real user metrics tracking
- **Accessibility**: WCAG 2.1 compliance improvements

## 🐛 Known Limitations

1. **API Rate Limits**: OMDb free tier has 1000 requests/day limit
2. **Search Precision**: OMDb search can be imprecise for some queries
3. **Image Loading**: Some movie posters may fail to load
4. **Mobile Navigation**: Could benefit from hamburger menu on smaller screens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **OMDb API**: Movie data provider
- **Recharts**: Beautiful React chart library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **TanStack Query**: Powerful data synchronization
- **Redux Toolkit**: Modern Redux development#   m o v i e s - r e a c t - d e m o  
 