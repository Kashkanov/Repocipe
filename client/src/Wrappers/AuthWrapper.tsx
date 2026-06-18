import {useAuth} from "../Contexts/AuthContext";
import {Navigate} from "react-router-dom";
import type {FC} from "react";
import LoadingPage from "../Components/Shared/LoadingPage";

type AppProps = {
    children: React.ReactNode;
}

const AuthWrapper: FC<AppProps> = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <LoadingPage/>
    }
    if (!user) {
        return <Navigate to="/login"/>
    }
    console.log("authenticated user is: ", user.username);         //<===
    return children;

}

export default AuthWrapper;
