import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "lib/styles/globalStyles";
import Routers from "routes";
import { Provider } from "react-redux";
import store from "Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <Routers />
    </Provider>
  </React.StrictMode>
);
