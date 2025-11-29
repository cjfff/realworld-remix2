import { Link, redirect } from "@remix-run/react";

import { inputsSchema, type Inputs } from "~/libs/schemas/register";
import fetchClient from "~/libs/api";
import { useFetcher } from "~/hooks/useFetcher";
import type { components } from "~/consts/schema";

import { ErrorMessage } from "~/components/ErrorMessage";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { checkIsLogin, setToken } from "~/session.client";

export async function clientLoader({ request }: LoaderFunctionArgs) {
  if (checkIsLogin()) {
    return redirect("/");
  }

  return null;
}

export async function clientAction({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  const result = inputsSchema.safeParse(data);

  if (!result.success) {
    return {
      formState: data,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  const res = await fetchClient.POST("/users", {
    body: {
      user: result.data,
    },
  });

  if (res.error) {
    return {
      formState: data,
      errors: res.error.errors.body,
    };
  }

  setToken(res.data?.user.token!);
  return redirect("/");
}

export default () => {
  const { errors, fieldErrors, formState, fetcher, isLoading } = useFetcher<
    Inputs,
    components["schemas"]["User"]
  >();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ErrorMessage errors={errors} />

            <fetcher.Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                  defaultValue={formState?.username}
                />
              </fieldset>
              <ErrorMessage errors={fieldErrors?.username} />

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  defaultValue={formState?.email}
                />
              </fieldset>
              <ErrorMessage errors={fieldErrors?.email} />

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  defaultValue={formState?.password}
                />
              </fieldset>
              <ErrorMessage errors={fieldErrors?.password} />

              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                {isLoading ? "Loading" : "Sign up"}
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
};
