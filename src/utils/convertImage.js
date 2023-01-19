import { IMG } from "./REACT_APP_DB_BASE_URL_IMG";
import image from "../assets/img/no-body.svg";

export const convertImage = (url = "") => {
  if (url !== "" && url !== undefined) {
    // console.log(url);
    if (url?.includes("http")) {
      return url;
    } else if (url === null) {
      return image;
    } else {
      const img = IMG(url);
      return img;
    }
  }
  return url;
};

export const convertImageUrl = (url = "") => {
  if (url !== "" && url !== undefined && url !== null) {
    if (url?.includes("http")) {
      return url;
    } else {
      const img = IMG(url);
      return img;
    }
  }
  return url;
};
