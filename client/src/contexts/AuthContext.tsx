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
        console.log(`payload.exp: ${payload.exp} < ${Date.now()} = ${payload.exp * 1000 < Date.now()}`)
        return payload.exp * 1000 < Date.now();
    }

    const [token, setToken] = useState<string | null>(() => {
        const t = localStorage.getItem("token");
        // if token is not found, return null
        if (!t) {
            return null;
        }
        const parts = t.split(".");
        if (parts.length < 2) {
            localStorage.removeItem("token");
            return null;
        }
        const payload = JSON.parse(atob(parts[1]!));
        // if token is expired, remove it and return null
        if(isTokenExpired(payload)){
            localStorage.removeItem("token")
            return null;
        }
        // if token is valid, set user and return token
        setUser(payload);
        return t;
    });

    const loginToken = (token: string) => {
        setToken(token);
        const parts = token.split(".");
        if (parts.length < 2) {
            localStorage.removeItem("token");
            return null;
        }
        setUser(JSON.parse(atob(parts[1]!)));
        localStorage.setItem("token", token);
    }

    const logoutToken = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(undefined);
    }

    // useEffect(() => {
    //     if(!token)
    //         setUser(undefined)
    // }, [token]);

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
