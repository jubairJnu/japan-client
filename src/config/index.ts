// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // env: process.env.NEXT_PUBLIC_NODE_ENV,
  file_api: process.env.NEXT_PUBLIC_FILE_URL,
  api_url:
    process.env.NEXT_PUBLIC_NODE_ENV == "development"
      ? process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL
      : process.env.NEXT_PUBLIC_BACKEND_URL_PRODUCTION,
};
