import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "lib/styles/globalStyles";
import Routers from "routes";
import { Provider } from "react-redux";
import { persistor, store } from "Store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Routers />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
