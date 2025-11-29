import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import fetchClient from "~/libs/api";
import { checkIsLogin } from "~/session.client";

export async function clientAction({ request }: ActionFunctionArgs) {
  if (!checkIsLogin()) {
    return redirect("/login");
  }

  let formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { action, slug } = data as {
    slug: string;
    action: "favorite" | "unfavorite";
  };

  const params = {
    params: {
      path: {
        slug,
      },
    },
  };

  await (action === "favorite"
    ? fetchClient.POST("/articles/{slug}/favorite", params)
    : fetchClient.DELETE("/articles/{slug}/favorite", params));

  return true;
}

export { ErrorBoundary } from "~/root";
