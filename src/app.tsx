import React from "react";
import GlobalStyle from "lib/styles/globalStyles";
import Routers from "routes";
import { Provider } from "react-redux";
import { persistor, store } from "Store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProviderComponent } from "lib/styles/Theme";
import { I18nextProvider } from "react-i18next";
import i18n from "lib/i18n";
import { AnimationProvider } from "hooks/useAnimation";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProviderComponent>
            <I18nextProvider i18n={i18n}>
              <AnimationProvider>
                <GlobalStyle />
                <Routers />
              </AnimationProvider>
            </I18nextProvider>
          </ThemeProviderComponent>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
