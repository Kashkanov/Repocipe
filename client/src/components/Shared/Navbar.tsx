import {NavLink, useLocation} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {logout} from "../../services/api";

const Navbar = () => {
    const {user} = useAuth();

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    }

    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout()
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    const links = [
        {
            id: 0,
            name: "Home",
            link: "/",
            access: ["PUBLIC"]
        },
        {
            id: 1,
            name: "Explore",
            link: "/Recipes",
            access: ["PUBLIC"]
        },
        {
            id: 2,
            name: "Create",
            link: "/Create",
            access: ["USER", "ADMIN"]
        },
        {
            id: 3,
            name: "Matchipe",
            link: "/Matchipe",
            access: ["PUBLIC"]
        },
        {
            id: 4,
            name: "Admin",
            link: "/Admin",
            access: ["ADMIN"]
        }
    ];

    const isAuthorized = (access: string[]) => {
        if (access.includes("PUBLIC")) return true
        console.log(user)
        if (!user) return false;
        return access.includes(user?.role || "");
    }


    return (
        <>
            <nav className="fixed flex justify-start items-center h-15 w-screen bg-[#344E41] py-auto z-30 px-5">
                <div className="flex w-1/2 justify-start h-15">
                    <ul className="flex gap-5 h-15">
                        {
                            links.map((item) => {
                                return (
                                    isAuthorized(item.access) && (
                                    <li key={item.id}>
                                        <NavLink
                                            to={item.link}
                                            className="relative font-bold h-full w-full flex items-center justify-center px-3"
                                            // onClick={() => setSelectedIndex(item.id)}
                                        >
                                            {item.name}
                                            {isActive(item.link) &&
                                                <div className="absolute w-full h-[0.5rem] bottom-0 bg-white"></div>
                                            }
                                        </NavLink>
                                    </li>
                                    )
                                )
                            })
                        }
                    </ul>

                </div>
                <div className="flex justify-end gap-5 w-1/2">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="font-bold"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <NavLink
                                className="font-bold"
                                to="/login"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                className="font-bold"
                                to="/register"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar;