import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "@/redux/store";
import config from "@/config";
import { logout, setUser } from "../auth/authSliece";

const baseQuery = fetchBaseQuery({
  baseUrl: config.api_url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result && result.error && result.error.status === 403) {
    api.dispatch(logout());
  }

  if (result && result.error && result.error.status === 401) {
    // console.log("sending refresh token");
    // Sending refresh token
    const res = await fetch(`${config.api_url}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    // console.log("refres token", data);

    if (data && data.data && data.data.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user: user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

//
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,

  endpoints: () => ({}),
  tagTypes: ["rating", "booking", "profile"],
});
