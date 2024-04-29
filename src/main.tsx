import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'regenerator-runtime';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchHeadersAction, fetchLinesAction } from './store/api-actions.ts';
import App from './components/app/app.tsx';

store.dispatch(fetchHeadersAction());
store.dispatch(fetchLinesAction());


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory} basename={import.meta.env.BASE_URL}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
)
