import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import type {FC} from "react";
import LoadingPage from "../components/Shared/LoadingPage";

type AppProps = {
    children: React.ReactNode;
    access: string[];
}

const AuthWrapper: FC<AppProps> = ({children, access}) => {
    const { isAuthenticated, user } = useAuth();
    const isAuthorized = access.includes(user?.role || "")

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
        return <Navigate to="/" />;
    }

    return children;

}

export default AuthWrapper;
