import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Store from './Store'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './Routing/AppRouter';
import './index.css';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(  <Provider store={Store}>
  <RouterProvider router={AppRouter}/>

</Provider>
);
