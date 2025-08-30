import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../../Redux/Slices/uiSlice";
import { Moon, Sun } from "lucide-react";
export const Header = () => {
  const dispatch = useDispatch();
  const { currentView, isDarkMode } = useSelector(state => state.ui);

  const toggleDarkMode = () => {
    dispatch(uiSlice.actions.toggleDarkMode());
  };

  const setView = (view) => {
    dispatch(uiSlice.actions.setCurrentView(view));
  };

  return (
    <header className={` sticky top-0 z-40 border-b p-2 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            {/* <h1 className="text-2xl font-bold">Doubledotts Movie</h1> */}
            <img src="/Doubledotts.png" alt="Doubledotts-logo" className="w-44" />
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setView('home')}
                className={`font-medium ${currentView === 'home'
                  ? 'text-blue-600'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Home
              </button>
              <button
                onClick={() => setView('favorites')}
                className={`font-medium ${currentView === 'favorites'
                  ? 'text-blue-600'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Favorites
              </button>
            </nav>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
              }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};