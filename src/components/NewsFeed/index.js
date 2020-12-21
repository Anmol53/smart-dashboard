import React, { useState, useEffect } from "react";
import "./styles.css";
import News from "./News";

export default function NewsFeed(props) {
  const BaseURL = "http://newsapi.org/v2/";
  const APIKey = "c53ce1c2892f4604b64f15aa6b22afbe";
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch(
      `${BaseURL}top-headlines?apiKey=${APIKey}&country=${props.countryCode}`
    )
      .then((r) => r.json())
      .then((r) => {
        setNewsData(r.articles);
      });
  }, []);

  const renderNews = () => {
    return newsData
      .filter((news, idx) => news.title && news.content)
      .map((news, idx) => {
        return (
          <News
            title={news.title}
            content={news.content.substr(0, news.content.lastIndexOf("["))}
            url={news.url}
            imgUrl={news.urlToImage}
            time={news.publishedAt}
            author={news.author}
          />
        );
      });
  };
  return <div className="news-feed-main">{renderNews()}</div>;
}
