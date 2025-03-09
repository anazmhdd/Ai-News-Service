import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import { format } from "date-fns";
import "dotenv/config";
import express from "express";
import { db } from "./firebase.js";
import scrapNews from "./services/scrap.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fetchNewsByCategory = async (category) => {
  const today = format(new Date(), "yyyy-MM-dd");

  console.log(`Scraping news for category: ${category} on ${today}`);

  const newsData = await scrapNews(category);

  console.log(`Scraped ${newsData.length} articles for ${category}`);

  return newsData.map((article) => ({
    publishedAt: today,
    title: article.title,
    description: article.summary,
    urlToImage: article.image,
    content: article.content,
    category: category === "political-pulse" ? "politics" : category,
  }));
};

app.post("/news/save", async (req, res) => {
  try {
    const todayDate = format(new Date(), "yyyy-MM-dd");

    const internationalNews = await fetchNewsByCategory("lifestyle");
    const nationalNews = await fetchNewsByCategory("india");
    const businessNews = await fetchNewsByCategory("business");
    const keralaNews = await fetchNewsByCategory("kerala");
    const educationNews = await fetchNewsByCategory("education");
    const politicalNews = await fetchNewsByCategory("political-pulse");

    const allArticles = [
      ...internationalNews,
      ...nationalNews,
      ...businessNews,
      ...keralaNews,
      ...educationNews,
      ...politicalNews,
    ];

    console.log(`Fetched ${allArticles.length} articles for ${todayDate}`);
    console.log("Sample article:", allArticles[0]);

    if (allArticles.length > 0) {
      await db.collection("news").doc(todayDate).set({
        date: todayDate,
        articles: allArticles,
      });
      res.send({ message: "News data saved successfully", data: allArticles });
    } else {
      res.status(404).send({ message: "No articles found to save" });
    }
  } catch (error) {
    console.error("Error saving news:", error);
    res.status(500).send({ error: "Failed to save news" });
  }
});

app.get("/breaking", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?sortBy=publishedAt&language=en&apiKey=e51c92df1b7f4549a04cf9453900d8f1"
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching breaking news");
  }
});

app.get("/news", async (req, res) => {
  try {
    const { date, category } = req.query;

    console.log(`Received request: Date = ${date}, Category = ${category}`);

    if (!date) {
      return res
        .status(400)
        .json({ error: "Date query parameter is required" });
    }

    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    console.log(`Fetching news for formatted date: ${formattedDate}`);

    const newsDoc = await db.collection("news").doc(formattedDate).get();
    console.log(
      "Firestore Response: ",
      newsDoc.exists ? "Document found" : "No document"
    );

    if (!newsDoc.exists) {
      console.log(`No news found for date: ${formattedDate}`);
      return res
        .status(404)
        .json({ message: `No news found for date: ${formattedDate}` });
    }

    let articles = newsDoc.data().articles;
    console.log(`Total articles found: ${articles.length}`);

    if (category && category.toLowerCase() !== "all") {
      articles = articles.filter(
        (article) => article.category === category.toLowerCase()
      );
      console.log(`Filtered articles count: ${articles.length}`);
    }

    if (articles.length > 0) {
      return res.json({
        message: `News for ${formattedDate} retrieved`,
        data: articles,
      });
    } else {
      console.log(`No news found for category: ${category}`);
      return res
        .status(404)
        .json({ message: `No news found for category: ${category}` });
    }
  } catch (error) {
    console.error("Error retrieving news:", error);
    return res.status(500).json({ error: "Failed to retrieve news" });
  }
});

app.get("/news/by-title", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .send({ error: "Title query parameter is required" });
    }

    const todayDate = format(new Date(), "yyyy-MM-dd");
    const newsDoc = await db.collection("news").doc(todayDate).get();

    if (newsDoc.exists) {
      const articles = newsDoc.data().articles;

      const article = articles.find(
        (article) => article.title === decodeURIComponent(title)
      );

      if (article) {
        res.send({
          message: "News article retrieved successfully",
          data: article,
        });
      } else {
        res
          .status(404)
          .send({ message: `No news article found with the title: ${title}` });
      }
    } else {
      res
        .status(404)
        .send({ message: `No news data found for the date: ${todayDate}` });
    }
  } catch (error) {
    console.error("Error retrieving news by title:", error);
    res.status(500).send({ error: "Failed to retrieve news article" });
  }
});

app.delete("/news/delete", async (req, res) => {
  try {
    const { date, title } = req.query;

    if (!date || !title) {
      return res
        .status(400)
        .send({ error: "Date and title query parameters are required" });
    }

    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const newsDoc = await db.collection("news").doc(formattedDate).get();

    if (newsDoc.exists) {
      let articles = newsDoc.data().articles;

      const articleIndex = articles.findIndex(
        (article) => article.title === decodeURIComponent(title)
      );

      if (articleIndex !== -1) {
        // Remove the article by title
        articles.splice(articleIndex, 1);

        // Update the news document with the modified articles array
        await db.collection("news").doc(formattedDate).update({ articles });

        res.send({
          message: `News article titled "${title}" deleted successfully`,
          data: articles,
        });
      } else {
        res
          .status(404)
          .send({ message: `No news article found with the title: ${title}` });
      }
    } else {
      res
        .status(404)
        .send({ message: `No news data found for the date: ${formattedDate}` });
    }
  } catch (error) {
    console.error("Error deleting news article:", error);
    res.status(500).send({ error: "Failed to delete news article" });
  }
});

app.get("/", async (req, res) => {
  res.send("API is live");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
