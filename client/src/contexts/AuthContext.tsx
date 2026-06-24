import {createContext, type FC, useContext, useEffect, useMemo, useState} from "react";
import type {User} from "../types"

type AuthContextType = {
    token: string | null;
    loginToken: (token: string) => void;
    logoutToken: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const loginToken = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    const logoutToken = () => {
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ token, loginToken, logoutToken, isAuthenticated: !!token }}>
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
