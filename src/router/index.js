import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";
// configure the routes
const router = createBrowserRouter([
    // { path: "/", element: <Layout /> },
    // { path: "/login", element: <Login /> }
    { path: "/", element: <AuthRoute> <Layout /> </AuthRoute> },
    { path: "/login", element: <Login /> }
]);
export default router;