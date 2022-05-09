import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Config/graphql.config";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";


const THEME = createTheme({
  typography: {
    fontFamily: `Mulish, Helvetica, Arial, sans-serif`,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
