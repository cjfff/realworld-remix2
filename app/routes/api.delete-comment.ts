import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import fetchClient from "~/libs/api";
import { checkIsLogin } from "~/session.client";

export async function clientAction({ request }: ActionFunctionArgs) {
  if (!(checkIsLogin())) {
    return redirect("/login");
  }
  let data = await request.json();
  const { slug, id } = data as {
    slug: string;
    id: number
  };

  const params = {
    params: {
      path: {
        slug,
        id
      },
    },
  };

  await fetchClient.DELETE("/articles/{slug}/comments/{id}", params);

  return true
}

export { ErrorBoundary } from "~/root";
