import React from "react";
import "./styles.css";

export default function News(props) {
  return (
    <div
      className="news-main-background"
      style={{ backgroundImage: `url(${props.imgUrl})` }}
    >
      <a className="news-anchor" href={props.url}>
        <div className="news-main">
          <h4 className="news-title">{props.title}</h4>
          <p className="news-content">{props.content}</p>
          <span className="news-time">
            {props.time
              ? new Date(props.time).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : "."}
          </span>
          <span className="news-author">
            {props.author
              ? props.author.length > 30
                ? props.author.substring(0, 27) + "..."
                : props.author
              : "-"}
          </span>
        </div>
      </a>
    </div>
  );
}
