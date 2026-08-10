import React from "react";

export const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, source, publishedAt } = props;

  return (
    <div className="card news-card h-100">
  <img
  src={imageUrl || "/noimage.jpg"}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/noimage.jpg";
  }}
  className="card-img-top news-image"
  alt="News"
/>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
  {title ? title.slice(0, 50) : "No Title"}...
</h5>

        <p className="card-text">
  {description ? description.slice(0, 100) : "No Description Available"}...
</p>
<div className="news-meta">

  <span>
    📰 {source || "Unknown Source"}
  </span>

  <span>
    👤 {author || "Unknown Author"}
  </span>

  <span>
    📅 {new Date(publishedAt).toLocaleDateString()}
  </span>

</div>

        <a
  href={newsUrl}
  target="_blank"
  rel="noreferrer"
  className="btn btn-dark btn-sm mt-auto"
>
  Read More →
</a>
      </div>
    </div>
  );
}

export default NewsItem;