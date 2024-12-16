const API_KEY = 'aad492fa30934cd891dbe2771e8c4334';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (query, filters, pageSize = 20) => {
  const url = new URL(`${BASE_URL}/${filters.category ? 'top-headlines' : 'everything'}`);
  url.searchParams.append('q', query);
  url.searchParams.append('apiKey', API_KEY);
  url.searchParams.append('pageSize', pageSize);

  // Add filters dynamically
  Object.keys(filters).forEach((key) => {
    if (filters[key]) url.searchParams.append(key, filters[key]);
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
};
