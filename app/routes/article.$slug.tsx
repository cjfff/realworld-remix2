import dayjs from "dayjs";
import { remark } from "remark";
import html from "remark-html";

import fetchClient from "~/libs/api";
import { useLoaderData } from "@remix-run/react";
import ArticleMeta from "~/components/ArticleDetail/ArticleMeta";
import Comments from "~/components/ArticleDetail/Comments";
import { CommentForm } from "~/components/ArticleDetail/CommentForm";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;

  if (!slug) {
    return {
      article: null,
    };
  }

  const [res, commentsRes] = await Promise.all([
    fetchClient.GET("/articles/{slug}", {
      params: {
        path: {
          slug,
        },
      },
    }),
    fetchClient.GET("/articles/{slug}/comments", {
      params: {
        path: {
          slug,
        },
      },
    }),
  ]);

  const article = res.data?.article;
  const comments = commentsRes.data?.comments;

  // parse html
  const processedContent = await remark().use(html).process(article?.body);
  const contentHtml = processedContent.toString();

  return {
    article,
    comments,
    contentHtml,
  };
}

export default () => {
  const { article, comments, contentHtml } =
    useLoaderData<typeof clientLoader>();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>

          <ArticleMeta article={article!} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: contentHtml || "" }}></div>
            <ul className="tag-list">
              {article?.tagList.map((tag) => {
                return (
                  <li key={tag} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article!} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentForm />

            <Comments comments={comments}></Comments>
          </div>
        </div>
      </div>
    </div>
  );
};
