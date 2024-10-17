import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { Footer, Header, PageWrapper } from "./common/components";
import { useChosenTheme } from "./common/hooks";
import "./common/styles/font-faces.css";
import "./common/styles/main";
import AppRoutes from "./router/router";

function App() {
  const theme = useChosenTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PageWrapper>
          <Header />
          <AppRoutes />
          <Footer />
        </PageWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
