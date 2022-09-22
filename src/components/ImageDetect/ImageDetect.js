import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";

export const ImageDetect = (USER) => {
 
  if (USER) {
    const { Image } = USER;
    if (Image.includes("http")) {
      return Image;
    } else {
      const img = `${REACT_APP_DB_BASE_URL_IMG}/${Image}`;
      return img;
    }
  } else {
    return "";
  }
};
