import {createContext, type FC, useContext, useEffect, useState} from "react";
import type {User} from "../types"
import {getUser} from "../services/api";

type AuthContextType = {
    user: User | undefined;
    checkAuth: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {

    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const checkAuth = async () => {
        try{
            const { data } = await getUser();
            setLoading(true);
            setUser(data);
        } catch (error) {
            setUser(undefined);
        }finally {
            setLoading(false);
        }
    }

    // Check auth on load
    useEffect(() => {
        void checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{user, checkAuth, loading}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
