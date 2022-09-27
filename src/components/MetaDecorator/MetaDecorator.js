import React from "react";
import { Helmet } from "react-helmet";
import { REACT_APP_DB_BASE_URL } from "../../utils/REACT_APP_DB_BASE_URL_IMG";

const MetaDecorator = ({ title, description, imgUrl, imgAlt, type }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta property="og:type" content={type || "article"} />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:url" content={REACT_APP_DB_BASE_URL} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:site_name" content="European Travel, Inc." />
        <meta name="twitter:image:alt" content={imgAlt} />

        <meta property="fb:app_id" content="your_app_id" />
        <meta name="twitter:site" content="@website-username" />
      </Helmet>
    </>
  );
};

export default MetaDecorator;
