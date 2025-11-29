import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import fetchClient from "~/libs/api";
import { checkIsLogin } from "~/session.client";

export async function clientAction({ request }: ActionFunctionArgs) {
  if (!(checkIsLogin())) {
    return redirect("/login");
  }
  let data = await request.json();
  const { slug } = data as {
    slug: string;
  };

  const params = {
    params: {
      path: {
        slug,
      },
    },
  };

  await fetchClient.DELETE("/articles/{slug}", params);

  return redirect("/");
}
export { ErrorBoundary } from "~/root";
