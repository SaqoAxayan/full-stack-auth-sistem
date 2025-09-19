import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterList } from "./data";

const RouterWrapper = () => {
  const pendingRouterList = (routes: typeof RouterList) =>
    routes.map((route) => (
      <Route element={route.element} path={route.path} key={route.id} >
         {route.children && pendingRouterList(route.children)}
      </Route>
    ));
  return <Routes>
    {pendingRouterList(RouterList)}
  </Routes>;
};

export default RouterWrapper;
