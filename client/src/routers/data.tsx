import path from "path";
import { JSX, lazy } from "react";

const Main = lazy(() => import("../ui/Main"));
const Registration = lazy(() => import("../ui/Registration"));
const Login = lazy(() => import("../ui/Login"));
const Home = lazy(() => import("../Pages/Home"));
const Todo = lazy(() => import("../Pages/Todo"));

export interface RouterType {
  element: JSX.Element;
  path: string;
  id: number;
  children?: RouterType[];
}

export const RouterList: RouterType[] = [
  {
    element: <Home />,
    path: "/",
    id: 1,
  },
  {
    element: <Main />,
    path: "/api",
    id: 2,
    children: [
      {
        element: <Registration />,
        path: "registration",
        id: 1,
      },
      {
        element: <Login />,
        path: "login",
        id: 2,
      },
    ],
  },
  {
    element: <Todo />,
    path: "/Todo",
    id: 3,
  },
];
