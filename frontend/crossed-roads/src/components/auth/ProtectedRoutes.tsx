import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "./auth";

export default function ProtectedRoutes() {
    const isAuth = isLoggedIn();
    return isAuth ? <Outlet /> : <Navigate to='/welcome' />
}