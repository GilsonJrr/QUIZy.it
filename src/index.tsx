import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "lib/styles/globalStyles";
import Routers from "routes";
import { Provider } from "react-redux";
import { persistor, store } from "Store";
import { PersistGate } from "redux-persist/integration/react";
import Theme from "lib/styles/Theme";
import { I18nextProvider } from "react-i18next";
import i18n from "lib/i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <I18nextProvider i18n={i18n}>
            <GlobalStyle />
            <Routers />
          </I18nextProvider>
        </Theme>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
