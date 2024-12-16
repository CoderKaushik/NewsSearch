import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Home = () => {
  const [query, setQuery] = useState(localStorage.getItem('query') || "");
  const [fromDate, setFromDate] = useState(localStorage.getItem('fromDate') || "");
  const [toDate, setToDate] = useState(localStorage.getItem('toDate') || "");
  const [category, setCategory] = useState(localStorage.getItem('category') || "");
  const [filters, setFilters] = useState({
    language: localStorage.getItem('language') || "en",
    sortBy: localStorage.getItem('sortBy') || "popularity"
  });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = () => {
    if (!query) {
      alert("Please enter a keyword to search.");
      return;
    }
    setLoading(true);
    const searchFilters = { ...filters, fromDate, toDate, category };
    localStorage.setItem('query', query);
    localStorage.setItem('fromDate', fromDate);
    localStorage.setItem('toDate', toDate);
    localStorage.setItem('category', category);
    localStorage.setItem('language', filters.language);
    localStorage.setItem('sortBy', filters.sortBy);
    navigate("/results", { state: { query, filters: searchFilters } });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <h1 className="text-2xl font-bold">News Search</h1>
        <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </button>
      </div>
      <input
        type="text"
        className="border p-2 rounded w-full max-w-md text-gray-700 dark:text-gray-500"
        placeholder="Enter keywords..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <div className="mt-4 w-full max-w-md">
        <label className="block text-gray-700 dark:text-gray-500">From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full p-2 border rounded text-gray-700 dark:text-gray-500"
        />
      </div>
      <div className="mt-4 w-full max-w-md">
        <label className="block text-gray-700 dark:text-gray-300">To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full p-2 border rounded text-gray-700 dark:text-gray-500"
        />
      </div>
      <div className="mt-4 w-full max-w-md">
        <label className="block text-gray-700 dark:text-gray-300">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded text-gray-700 dark:text-gray-500"
        >
          <option value="">All</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div className="mt-4 w-full max-w-md">
        <label className="block text-gray-700 dark:text-gray-300">Language</label>
        <select
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          className="w-full p-2 border rounded text-gray-700 dark:text-gray-500"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div className="mt-4 w-full max-w-md">
        <label className="block text-gray-700 dark:text-gray-300">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="w-full p-2 border rounded text-gray-700 dark:text-gray-500"
        >
          <option value="popularity">Popularity</option>
          <option value="publishedAt">Newest</option>
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="loader border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
