import { REACT_APP_DB_BASE_URL_IMG } from "./REACT_APP_DB_BASE_URL_IMG";

export const convertImage = (url = "") => {
  if (url !== "" && url !== undefined) {
    if (url?.includes("http")) {
      return url;
    } else {
      const img = `${REACT_APP_DB_BASE_URL_IMG}/${url}`;
      return img;
    }
  }
  return url;
};
