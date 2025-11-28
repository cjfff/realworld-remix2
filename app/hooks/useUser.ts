import { useRouteLoaderData } from "@remix-run/react";
import type { components } from "~/consts/schema";

export const useUser = () => {
    const context = useRouteLoaderData<{user: components['schemas']['User']}>('root')

    return context?.user
}