import {createContext, type FC, useContext, useEffect, useMemo, useState} from "react";
import type {User} from "../types"

type AuthContextType = {
    token: string | null;
    loginToken: (token: string) => void;
    logoutToken: () => void;
    isAuthenticated: boolean;
    user: User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {

    const [user, setUser] = useState<User | undefined>();

    const isTokenExpired = (payload: User): boolean => {
        return payload.exp * 1000 < Date.now();
    }

    const [token, setToken] = useState<string | null>(() => {
        const t = localStorage.getItem("token");
        if (!t) return null;
        const payload = JSON.parse(atob(t?.split(".")[1]));
        setUser(payload);
        return t && !isTokenExpired(payload) ? t : null;
    });

    const loginToken = (token: string) => {
        setToken(token);
        setUser(JSON.parse(atob(token.split(".")[1])))
        localStorage.setItem("token", token);
    }

    const logoutToken = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(undefined);
    }

    useEffect(() => {
        console.log("Token changed:", token);
    }, [token]);

    return (
        <AuthContext.Provider value={{token, loginToken, logoutToken, isAuthenticated: !!token, user}}>
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
