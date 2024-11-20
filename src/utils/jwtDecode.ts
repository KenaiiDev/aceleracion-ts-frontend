import { jwtDecode } from "jwt-decode";

export const Decode = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token", error);
  }
};

export const tokenExpired = () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const currentTime = Math.floor(Date.now() / 1000);

    if (!accessToken || !refreshToken) {
      return true;
    }

    const refreshTokenDecoded = Decode(refreshToken);

    const expirationTimeRefreshToken = refreshTokenDecoded?.exp;
    const expiredRefreshToken =
      expirationTimeRefreshToken && expirationTimeRefreshToken < currentTime;

    if (expiredRefreshToken) {
      return true;
    }

    const tokenDecode = Decode(accessToken);

    const expirationTime = tokenDecode?.exp;
    const expired = expirationTime && expirationTime < currentTime;
    const token = expired ? refreshToken : accessToken;

    return token;
  } catch (error) {
    console.error("Error checking token expiration", error);
  }
};
