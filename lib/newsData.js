import { newsDataEn } from "./newsData.en";
import { newsDataKa } from "./newsData.ka";

export const getNewsData = (locale) => {
  return locale === "ka" ? newsDataKa : newsDataEn;
};
