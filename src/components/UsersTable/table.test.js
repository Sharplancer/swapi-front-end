import React from 'react';
import { render, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '../../App';
import store from "../../store/index";
import { fetchUsers } from '../../store/users-slice';

import {
  ColorModeScript,
  ChakraProvider,
  theme
} from "@chakra-ui/react";
import UsersTable from '.';

describe('Table', () => {
  describe('Present data to the table', () => {    
    it('present table', async () => {

      act(() => {
        render(
          <Router>
            <Provider store={store}>
              <ColorModeScript />
                <ChakraProvider theme={theme}>
                  <App />
                </ChakraProvider> 
            </Provider>
          </Router>
        )  
      });

      act(async () => {
        await store.dispatch(fetchUsers(1));
      }).then( () => {
          const table = screen.getByText(/C-3PO/i);
          expect(table).toBeInTheDocument();
        }
      );
    });
  });
});
