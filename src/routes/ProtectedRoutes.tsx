import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../features/Store";

export default function ProtectedRoute() {
  const { user } = useAppSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/" />;
}