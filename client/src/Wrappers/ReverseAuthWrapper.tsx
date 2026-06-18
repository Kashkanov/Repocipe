import {useAuth} from "../Contexts/AuthContext";
import {Navigate} from "react-router-dom";
import type {FC} from "react";
import Loading from "../Components/Shared/Loading";

type AppProps = {
    children: React.ReactNode;
}

const ReverseAuthWrapper: FC<AppProps> = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <Loading/>
    }
    if (user) {
        return <Navigate to="/"/>
    }
    return children;
}

export default ReverseAuthWrapper;
