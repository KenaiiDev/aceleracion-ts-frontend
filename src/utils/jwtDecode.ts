import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

export const getValidToken = (): string | null => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const currentTime = Math.floor(Date.now() / 1000);

    if (!accessToken || !refreshToken) {
      console.error("Tokens no encontrados en el almacenamiento local.");
      return null;
    }

    const refreshTokenDecoded = decodeToken(refreshToken);
    if (!refreshTokenDecoded) return null;

    if (refreshTokenDecoded.exp < currentTime) {
      console.error("El refresh token ha expirado.");
      return null;
    }

    const accessTokenDecoded = decodeToken(accessToken);
    if (!accessTokenDecoded) return null;

    return accessTokenDecoded.exp < currentTime ? refreshToken : accessToken;
  } catch (error) {
    console.error("Error al obtener un token válido:", error);
    return null;
  }
};
