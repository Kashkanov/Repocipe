import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import {type FC, useEffect} from "react";
import LoadingPage from "../components/Shared/LoadingPage";

type AppProps = {
    children: React.ReactNode;
    access: string[];
}

const AuthWrapper: FC<AppProps> = ({children, access}) => {
    const { user, loading, checkAuth } = useAuth();
    const isAuthorized = access.includes(user?.role || "")

    useEffect(() => {
        void checkAuth();
    }, []);

    if (loading) return <LoadingPage />;
    if (user){
        return isAuthorized ? children : <Navigate to="/" />;
    }
    return <Navigate to="/login" />;

}

export default AuthWrapper;
