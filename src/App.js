import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef();
  const [error, setError] = useState(null);
  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  console.log(results);

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div className="container">
      <img alt="React Logo" src="https://icon.now.sh/react/c0c" />
      <h1 >Search for IT News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          ref={searchInputRef}
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          
        />
        <button type="submit" className="submit-button">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="clear-button"
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div className="loading">Loading results...</div>
      ) : (
        <ul className="results-list">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                rel="noopener noreferrer"
                href={result.url}
                target="_blank"
                className="result"
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="error">{error.message}</div>}
    </div>
  );
}
