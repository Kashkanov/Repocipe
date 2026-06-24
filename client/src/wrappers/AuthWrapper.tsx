import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import type {FC} from "react";
import LoadingPage from "../Components/Shared/LoadingPage";

type AppProps = {
    children: React.ReactNode;
}

const AuthWrapper: FC<AppProps> = ({children}) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;

}

export default AuthWrapper;
