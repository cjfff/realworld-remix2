
import { Avatar } from "../Avatar";
import dayjs from "dayjs";
import { Link } from "@remix-run/react";
import { FavoriteButton } from "../FavoriteButton";
import type { components } from "~/consts/schema";

export const Article = ({
  article,
}: {
  article: Omit<components["schemas"]["Article"], "body">;
}) => {
  const profileHref = `/profile/${article.author.username}`;
  const articleHref = `/article/${article.slug}`;
  
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={profileHref}>
          <Avatar src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={profileHref} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {dayjs(article.createdAt).format("MMMM D")}th
          </span>
        </div>
        <FavoriteButton
          className="pull-xs-right"
          text=""
          count={article?.favoritesCount}
          slug={article.slug}
          favorite={article.favorited}
        />
      </div>
      <Link to={articleHref} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        {article.tagList.length ? (
          <ul className="tag-list">
            {article.tagList.map((tag) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              );
            })}
          </ul>
        ) : null}
      </Link>
    </div>
  );
};
