import './App.css';
import { useSelector } from 'react-redux';
import HomePage from './components/Home/Home';
import { lazy, Suspense } from 'react';
import { MovieModalComponent } from './components/MovieModal';
import { FavoritesDashboard } from './components/FavoritesDashboard';
import { Header } from './components/Layout/Header';


function App() {
  const { currentView, isDarkMode } = useSelector(state => state.ui);
  const MovieModal = lazy(() => Promise.resolve({ default: MovieModalComponent }));
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && <HomePage />}
        {currentView === 'favorites' && <FavoritesDashboard />}

        <Suspense fallback={
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }>
          <MovieModal />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
