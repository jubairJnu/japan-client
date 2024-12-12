// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // env: process.env.NEXT_PUBLIC_NODE_ENV,

  api_url:
    process.env.NEXT_PUBLIC_NODE_ENV == "development"
      ? process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL
      : process.env.NEXT_PUBLIC_BACKEND_URL_PRODUCTION,

  file_upload_api: process.env.NEXT_PUBLIC_FILE_UPLOAD_API,
};

console.log(
  process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL,
  "env",
  process.env.NEXT_PUBLIC_NODE_ENV
);
