/// <reference types="vite-plugin-svgr/client" />
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "rc-dialog/assets/index.css";
import { BrowserRouter } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import {
  ChainCheckWrapper,
  Footer,
  Header,
  PageWrapper,
} from "./common/components";
import { useChosenTheme } from "./common/hooks";
import "./common/styles/font-faces.css";
import "./common/styles/main";
import { wagmiConfig } from "./config";
import AppRoutes from "./router/router";

const queryClient = new QueryClient();

function App() {
  const theme = useChosenTheme();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ChainCheckWrapper>
            <BrowserRouter>
              <PageWrapper>
                <Header />
                <AppRoutes />
                <Footer />
              </PageWrapper>
            </BrowserRouter>
          </ChainCheckWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
