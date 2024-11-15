import ReactDOM from 'react-dom/client';
import React from 'react';
import Login from './components/login/login.jsx'
import Register from './components/register/register.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import Notes from './components/notes/notes.jsx';
import Flashcards from './components/flashcards/flashcards.jsx';
import Challenge from './components/flashcards/challenge.jsx';
import Profile from './components/profile/profile.jsx';
import Root from './App.jsx';
import Callendar from './components/calendar/calendar.jsx';
import Password_reset from './components/password_reset/password_reset.jsx';
import Change_password from './components/password_reset/change_password.jsx';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>,
    //   errorElement: <ErrorPage />,
    },
    {
        path: "/Login",
        element: <Login/>,
      //   errorElement: <ErrorPage />,
      },
      {
        path: "/Register",
        element: <Register/>,
      //   errorElement: <ErrorPage />,
      },
      {
        path: "/Callendar",
        element: <Callendar/>,
      //   errorElement: <ErrorPage />,
      },
      {
        path: "/Notes/:id",
        element: <Notes/>,
      //   errorElement: <ErrorPage />,
      },
      {
        path: "/Notes/:id/Flashcards",
        element: <Flashcards/>,
      //   errorElement: <ErrorPage />,
      },
      {
        path: "/Notes/:id/FlashcardChallenge",
        element: <Challenge/>,
      //   errorElement: <ErrorPage />,
      },
      {
        path: "/Profile",
        element: <Profile/>,
      },
      {
        path: "*",
        element: <Dashboard/>,
      },
      {
        path:"/Password_reset",
        element: <Password_reset/>,
      },{
        path: "/Change_password",
        element: <Change_password/>,
      }
   

  ]);
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
