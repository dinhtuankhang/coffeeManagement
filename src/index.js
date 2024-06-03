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
import Introduction from './components/IntroductionPage/Introduction';
import ServiceProvided from './components/IntroductionPage/ServiceProvided';
import Staffs from './components/IntroductionPage/Staffs';
import MachinesAndDevices from './components/IntroductionPage/MachinesAndDevices';
import CompletedJobs from './components/IntroductionPage/CompletedJobs';
import EDashboard from './components/Employee/EDashboard';
import ENotification from './components/Employee/ENotification';
import ECalendar from './components/Employee/ECalendar';
import ELibrary from './components/Employee/ELibrary';
import EQuickChat from './components/Employee/EQuickChat';
import MTasksManagement from './components/Manager/MTasksManagement';
import MStaffsManagement from './components/Manager/MStaffsManagement';
import MNotification from './components/Manager/MNotification';
import MLibrary from './components/Manager/MLibrary';
import MQuickChat from './components/Manager/MQuickChat';
import ChangePassword from './components/users/ChangePassword';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <App />
    </ProtectedRoute>,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path: "/introduction",
    element: <Introduction/>,
  },
  {
    path: "/services",
    element: <ServiceProvided/>,
  },
  {
    path: "/staffs",
    element: <Staffs/>,
  },
  {
    path: "/machinesdevices",
    element: <MachinesAndDevices/>,
  },
  {
    path: "/completedjobs",
    element: <CompletedJobs/>,
  },
  {
    path: "/edashboard",
    element: <EDashboard/>,
  },
  {
    path: "/enotification",
    element: <ENotification/>,
  },
  {
    path: "/ecalendar",
    element: <ECalendar/>,
  },
  {
    path: "/elibrary",
    element: <ELibrary/>,
  },
  {
    path: "/echat",
    element: <EQuickChat/>,
  },
  {
    path: "/mtask",
    element: <MTasksManagement/>,
  },
  {
    path: "/mstaff",
    element: <MStaffsManagement/>,
  },
  {
    path: "/mnotification",
    element: <MNotification/>,
  },
  {
    path: "/mlibrary",
    element: <MLibrary/>,
  },
  {
    path: "/mchat",
    element: <MQuickChat/>,
  },
  {
    path: "/change",
    element: <ChangePassword/>,
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
