import { jwtDecode } from "jwt-decode";

export const VerifyJwt = (token: string) => {
  return jwtDecode(token);
};
