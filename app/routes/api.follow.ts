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
  const { action, username } = data as {
    username: string;
    action: "follow" | "unfollow";
  };

  const params = {
    params: {
      path: {
        username,
      },
    },
  };

  await (action === "follow"
    ? fetchClient.POST("/profiles/{username}/follow", params)
    : fetchClient.DELETE("/profiles/{username}/follow", params));

  return true;
}

export { ErrorBoundary } from "~/root";
