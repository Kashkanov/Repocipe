import {createContext, type FC, useContext, useEffect, useMemo, useState} from "react";
import type {User} from "../types"

type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    checkAuth: () => Promise<void>;
    returnUrl: string;
    setReturnUrl: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [returnUrl, setReturnUrl] = useState<string>("/");
    const backend_url = import.meta.env.VITE_API_URL;

    const checkAuth = async () => {

        try {
            const response = await fetch(backend_url + "api/me", {
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data: ", data);     //<===
                if (data) {
                    setUser(data);
                    setLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
            setUser(null);
            setLoading(false);
        }
        finally {
            setLoading(false)
        }
    }


    const login = async (username: string, password: string) => {
        const response = await fetch(backend_url + "api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({username, password}),
        })

        if(response.ok) {
            const data = await response.json();
            setUser(data);
            setLoading(false);
            console.log("user logged in: ", data);      //<===
            return true;
        }
        return false;
    }

    const logout = () => {
        setLoading(true);
        fetch(backend_url + "api/logout", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                setUser(null);
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const value: AuthContextType = useMemo(() => ({
        user,
        setUser,
        checkAuth,
        returnUrl,
        setReturnUrl,
        loading,
        login,
        logout
    }), [user, setUser, checkAuth, returnUrl, setReturnUrl, login, logout]);

    return (
        <AuthContext.Provider value={value}>
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
