import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import { Provider } from 'react-redux'
import store from "./store/index";

import {
  ColorModeScript,
  ChakraProvider,
  theme
} from "@chakra-ui/react";

describe('App', () => {
  describe('Home page', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ColorModeScript />
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider> 
        </Provider>
      )
    });

    it('renders table', () => {
      const table = screen.getByText(/Height/i);
      expect(table).toBeInTheDocument();
    });

  });
});
