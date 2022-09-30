import "antd/dist/antd.less";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./stores/store";
const root = ReactDOM.hydrateRoot(document.getElementById("root"));
const helmetContext = {};
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider context={helmetContext} defer={false}>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
