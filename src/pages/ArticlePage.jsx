import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ArticlePage = () => {
  const { state } = useLocation();
  const { article } = state;
  const navigate = useNavigate();
  const [showFullText, setShowFullText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [showAds, setShowAds] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const content = showFullText ? article.content : article.content.slice(0, 5000);

  const handleBack = () => {
    setLoading(true);
    navigate(-1);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div className={`w-screen h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="p-4 max-w-3xl mx-auto relative">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Back
          </button>
          <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          </div>
        ) : (
          <>
            <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover rounded" />
            <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">{parse(content)}</div>
            {article.content.length > 5000 && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="text-blue-500 mt-2"
              >
                {showFullText ? "Show Less" : "Show More"}
              </button>
            )}
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Published at: {new Date(article.publishedAt).toLocaleString()}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Source: {article.source.name}</p>
            </div>
            <button
              onClick={() => window.open(article.url, "_blank")}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Read Original Article
            </button>
          </>
        )}
      </div>
      {showAds && (
        <div className="fixed top-0 right-0 mt-4 mr-4 w-80 h-80 bg-gray-200 dark:bg-gray-800 rounded shadow-lg sm:absolute sm:top-0 sm:right-0 sm:mt-4 sm:mr-4 sm:w-64 sm:h-64 sm:bg-gray-200 sm:dark:bg-gray-800 sm:rounded sm:shadow-lg">
          <button
            onClick={() => setShowAds(false)}
            className="absolute top-2 right-2 text-gray-700 dark:text-gray-300"
          >
            &times;
          </button>
          {/* Google Ads Placeholder */}
          <p className="text-center text-gray-700 dark:text-gray-300 mt-4">Google Ads</p>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
