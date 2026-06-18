import {NavLink, useLocation} from "react-router";
import {useAuth} from "../../Contexts/AuthContext";

const Navbar = () => {
    const {user, logout} = useAuth();

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    }

    const location = useLocation();

    const links = [
        {
            id:0,
            name: "Home",
            link: "/"
        },
        {
            id:1,
            name: "Explore",
            link: "/Recipes"
        },
        {
            id:2,
            name: "Create",
            link: "/Create"
        },
        {
            id:3,
            name: "Matchipe",
            link: "/Matchipe"
        }
    ];

    return (
        <>
            {user && (
                <nav className="fixed flex justify-start items-center h-15 w-screen bg-[#344E41] py-auto z-30 px-5">
                    <div className="flex w-1/2 justify-start h-15">
                        <ul className="flex gap-5 h-15">
                            {
                                links.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <NavLink
                                                to={item.link}
                                                className="relative font-bold h-full w-full flex items-center justify-center px-3"
                                                // onClick={() => setSelectedIndex(item.id)}
                                            >
                                                {item.name}
                                                { isActive(item.link) &&
                                                    <div className="absolute w-full h-[0.5rem] bottom-0 bg-white"></div>
                                                }
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                    <div className="flex justify-end w-1/2">
                        {user &&
                            <button
                                onClick={logout}
                                className="font-bold"
                            >
                                Logout
                            </button>
                        }
                    </div>
                </nav>
            )}
        </>
    )
}

export default Navbar;