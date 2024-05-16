import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle, { theme } from "lib/styles/globalStyles";
import Routers from "routes";
import { Provider } from "react-redux";
import { persistor, store } from "Store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routers />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
