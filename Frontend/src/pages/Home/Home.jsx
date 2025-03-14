import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import LogoutButton from "../../components/Logout/Logout";
import { getDate } from "../../services/functions";
import styles from "./Home.module.css";
function OldHome() {
  const [articles, setArticles] = useState(null);
  const [query, setQuery] = useState("india");
  const deImage =
    "https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg";
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://news-service-api.vercel.app/news?date=${getDate()}&category=${query}`;
      try {
        const response = await axios.get(url);
        const sortedArticles = response.data.data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching the news:", error);
        axios.post("http://localhost:3000/news/save");
      }
    };

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  if (!articles) {
    return <Loader />;
  }
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.branding}>
            <h1>
              <span className={styles.highlight}>AI-Driven</span> News Service
            </h1>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <p
                  onClick={() => {
                    setQuery("kerala");
                  }}
                >
                  Kerala
                </p>
              </li>
              <li>
                <p
                  onClick={() => {
                    setQuery("india");
                  }}
                >
                  National
                </p>
              </li>
              <li>
                <p
                  onClick={() => {
                    setQuery("lifestyle");
                  }}
                >
                  Lifestyle
                </p>
              </li>
              <li>
                <p
                  onClick={() => {
                    setQuery("education");
                  }}
                >
                  education
                </p>
              </li>
              <li>
                <button
                  onClick={() => {
                    axios.post(" ");
                  }}
                >
                  Update news
                </button>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={styles.showcase}>
        <div className={styles.container}>
          <h1>Welcome to AI-Driven News Service</h1>
          <p>Your one-stop platform for the latest and most accurate news.</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.newsCardsContainer}>
          {articles &&
            articles
              .filter((article) => article.title != "[Removed]")
              .filter((article) => article.urlToImage)
              .map((article, index) => (
                <div
                  key={index}
                  className={styles.card}
                  title={article.content}
                >
                  <img
                    src={article.urlToImage || deImage}
                    alt={article.title}
                  />
                  <div className={styles.cardContent}>
                    <h3>{article.title}</h3>
                    <p>{article.description || "No description available."}</p>
                  </div>
                </div>
              ))}
        </section>
      </div>

      <footer className={styles.footer}>
        <p>AI-Driven News Service &copy; 2024</p>
      </footer>
    </div>
  );
}

export default OldHome;
