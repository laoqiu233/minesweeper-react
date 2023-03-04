import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Game from './features/game/Game';
import Window from './Window';
import AboutPage from './AboutPage';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createHashRouter([
  {
      path: "/",
      element: <App></App>,
      children: [
          {
            path: "about",
            element: (
              <Window title="About Me">
                <AboutPage/>
              </Window>
            )
          },
          {
              path: "minesweeper",
              element: (
                  <Window title="Minesweeper">
                      <Game settings={{height:16, width: 16, minesCount: 40}}/>
                  </Window>
              )
          }
      ]
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
