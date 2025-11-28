import { useLoaderData } from "@remix-run/react";
import fetchClient from "~/libs/api";
import Articles from "~/components/Articles";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const searchParams = Object.fromEntries(url.searchParams.entries()) as {
    page: string;
    size: string;
    tag: string
  };

  const page = searchParams?.page || 1;
  const size = searchParams?.size || 10;
  const tag = searchParams?.tag || "";

  const res = await fetchClient.GET("/articles", {
    params: {
      query: {
        limit: Number(size),
        offset: Number(size) * (Number(page) - 1),
        tag
      },
    },
  });

  return {
    ...res.data,
    page: Number(page),
    size: Number(size),
  };
}

export default () => {
  const {
    page,
    size,
    articlesCount: total = 0,
    articles = [],
  } = useLoaderData<typeof loader>();

  return <Articles total={total} articles={articles} page={page} size={size} />;
};
