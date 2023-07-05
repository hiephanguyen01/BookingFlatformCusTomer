import React from "react";
import { Helmet } from "react-helmet-async";
const REACT_APP_BASE_URL = "https://bookingstudio.vn/";
const MetaDecorator = ({ title, description, imgUrl, imgAlt, type }) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type || "article"} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:secure_url" content={imgUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta property="og:url" content={REACT_APP_BASE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content="European Travel, Inc." />
      <meta name="twitter:image:alt" content={imgAlt} />
      <meta property="fb:app_id" content="your_app_id" />
      <meta name="twitter:site" content="@website-username" />
    </Helmet>
  );
};

export default MetaDecorator;
