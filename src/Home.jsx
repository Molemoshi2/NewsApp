import { useState, useEffect } from "react";
import Navigation from "./navigationBar";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [articles, setArticles] = useState([]);
  const [searchedItem, setSearchedItem] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Function to fetch articles based on search or default
  const fetchArticles = async (pageNumber) => {
    const query = isSearched ? `q=${searchedItem}` : 'q=sa';
    const url = `https://newsapi.org/v2/everything?${query}&page=${pageNumber}&pageSize=25&apiKey=${import.meta.env.VITE_API_KEY}`;
    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      return parsedData;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return { articles: [], totalResults: 0 };
    }
  };

  // Initial load of articles
  const reload = async () => {
    const data = await fetchArticles(page);
    setArticles(data.articles);
    setTotalResults(data.totalResults);
  };

  // Fetch more articles
  const fetchMoreArticles = async () => {
    const nextPage = page + 1;
    const data = await fetchArticles(nextPage);
    setArticles(prevArticles => [...prevArticles, ...data.articles]);
    setPage(nextPage);
    setTotalResults(data.totalResults);
  };

  // Handle search input change
  const handleSearch = (event) => {
    setIsSearched(true);
    setSearchedItem(event.target.value);
    setPage(1);
    reload();
  };

  // Use effect to load initial data
  useEffect(() => {
    reload();
  }, []);

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreArticles}
      hasMore={articles.length < 100}
      loader={<h4 className="text-center">Loading...</h4>}
      endMessage={<p style={{ textAlign: "center", fontSize:"3rem" }}><b>Yay! You have seen it all</b></p>}
    >
      <div>
        <Navigation handleSearch={handleSearch} setCategory={setSearchedItem} />
        <h1 style={{ textAlign: "center", marginTop: "2rem", color: "rgb(236, 63, 121)" }}>Latest trending news</h1>
        <div className="article-container">
          {articles.map((article, index) => (
            <div key={index} className="card">
              <img style={{ width: "20rem", marginBottom: "2rem" }} src={article.urlToImage} alt={article.title} />
              <div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default Home;
