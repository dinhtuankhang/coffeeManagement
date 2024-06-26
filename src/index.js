import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/users/Login';
import AuthProvider from './contexts/AuthProvider';
import ProtectedRoute from './contexts/ProtectedRoute';
import Introduction from './components/Introduction';
import Signup from './components/users/Signup';
import Product from './components/users/Product';
import ChangePassword from './components/users/ChangePassword';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <App />
    </ProtectedRoute>,
  },
  {
    path:"/introduction",
    element:<Introduction/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/product",
    element:<Product/>
  },
  {
    path:"/change",
    element:<ChangePassword/>
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
