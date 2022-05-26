import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import store from "./store/index";

import {
  ColorModeScript,
  ChakraProvider,
  theme
} from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Router>
    <Provider store={store}>
      <ColorModeScript />
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider> 
    </Provider>
  </Router>
);
