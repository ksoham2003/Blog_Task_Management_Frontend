import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import ReaderLayout from "../layouts/ReaderLayout";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Blog from "../pages/Blog";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAuth } from "../context/AuthContext";

// Local Guard Component for Protected Routes
function ProtectedGuard({ allowedRoles }) {
    const { isLoggedIn, user } = useAuth();
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/" replace />;
    return <Outlet />;
}

function AppRouters() {
    let router = createBrowserRouter([
        {
            element: <ReaderLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/blog/:id",
                    element: <Blog />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                // Protected Routes
                {
                    element: <ProtectedGuard allowedRoles={["Author"]} />,
                    children: [
                        {
                            path: "/dashboard",
                            element: <Dashboard />
                        },
                        {
                            path: "/dashboard/new",
                            element: <Create />
                        },
                        {
                            path: "/dashboard/edit/:id",
                            element: <Edit />
                        }
                    ]
                }
            ]
        }
    ])
    return <RouterProvider router={router} />;
}

export default AppRouters;