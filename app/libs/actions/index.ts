import { data } from "@remix-run/react";

export async function loader() {
  throw data(null, { status: 404 });
}