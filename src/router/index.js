import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";

// configure the routes
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Layout />
            </AuthRoute>
        ),
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: 'article',
                element: <Article />,
            },
            {
                path: 'publish',
                element: <Publish />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
])

export default router