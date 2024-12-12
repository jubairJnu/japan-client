export type TError = {
  status: string;
  data?: {
    message?: string;
  };
};

export type TIdAndName = {
  _id: string;
  name: string;
};
