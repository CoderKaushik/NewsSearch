import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Results = () => {
  const { state } = useLocation();
  const { query, filters } = state;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews(query, { ...filters, page }, 20); // Set pageSize to 20
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setHasMore(data.articles.length > 0);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [query, filters, page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div className={`p-4 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" 
        >
          Back to Search
        </button>
        <div className="flex items-center">
          {!loading && (
            <span className="text-gray-700 dark:text-gray-300 mr-4">
              {articles.length} {articles.length === 1 ? "result" : "results"} found
            </span>
          )}
          <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[87.80vh]">
          <div className="loader border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="flex justify-center items-center h-[87.80vh]">
          <p className="text-gray-700 dark:text-gray-300">No results found</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="flex justify-center items-center mt-4"><div className="loader border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div></div>}
          endMessage={<p className="text-center text-gray-700 dark:text-gray-300 mt-4">No more results</p>}
          style={{ overflow: 'hidden' }} // Prevent scrollbar from appearing
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Results;
