import { BrowserRouter } from "react-router-dom";

import { useAuth } from "../hooks/auth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user } = useAuth();

  // It takes time to load the user. AuthRoutes always renders first (even if user is logged in. For a split second)
  // So inside AuthRoutes, we need to get user from localStorage to avoid undesired back to "/". Kind of gimmiky
  return <BrowserRouter>{user ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
}
