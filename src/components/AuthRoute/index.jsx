import { getToken } from "@/utils/token";
import { Navigate } from "react-router-dom";

// this component is used to protect the routes that require authentication
// navigate to the login page if the user is not authenticated
const AuthRoute = ({ children }) => {
    const isToken = getToken();
    return isToken ? <> {children} </> : <Navigate to="/login" />;
};

export default AuthRoute;