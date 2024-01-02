import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import MenuItem from "@/Components/MenuItem";
import CreatePostOverlay from "@/Components/CreatePostOverlay";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import { ThemeContext } from "@/Components/ThemeProvider";
import { SmallLogoDark } from "@/Components/icons/SmallLogoDark";
import { SmallLogoLight } from "@/Components/icons/SmallLogoLight";
import { LogoDark } from "@/Components/icons/LogoDark";
import { LogoLight } from "@/Components/icons/LogoLight";
import { SendIcon } from "@/Components/icons/SendIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IoMdSettings, IoMdBookmark } from "react-icons/io";
import { Logout } from "@/Components/Logout";
import { SmallLogo } from "@/Components/Logos/SmallLogo";
import { Logo } from "@/Components/Logos/Logo";

export default function Authenticated({ user, children }) {
    const { theme, handleThemeChange } = useContext(ThemeContext);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev)
    };

    // const menuClasses = `w-full h-full mt-2 py-2 w-48 bg-white dark:bg-black text-gray9 dark:text-gray1 rounded-md shadow-lg z-10 ${showMenu ? "" : "hidden"
    //     }`;

    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideMenu);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, [menuRef])

    const [activeLink, setActiveLink] = useState(null)

    return (
        <div className="flex w-full justify-center md:justify-normal lg:space-x-36 h-screen bg-white dark:bg-black selection:bg-purple-500 selection:text-white overflow-x-hidden">
            <div
                id="SideNav"
                className="fixed h-full bg-white dark:bg-black text-gray9 dark:text-gray1 w-[80px] lg:w-[210px] xl:w-[220px] md:block hidden border-r border-r-gray3"
            >
                <Link href="/dashboard">
                    {theme === "light" ? (
                        <>
                            <div className="block lg:hidden w-[25px] mt-10 ml-[28px] mb-10">
                                <SmallLogo Color="#000" className="cursor-pointer" />
                            </div>
                            <div className="hidden lg:block w-[25px] mt-10 ml-[28px] mb-10">
                                <Logo Color="#000" className="cursor-pointer" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="block lg:hidden w-[25px] mt-10 ml-[28px] mb-10">
                                    <SmallLogo Color="#000" className="cursor-pointer" />
                            </div>
                            <div className="hidden lg:block w-[25px] mt-10 ml-[28px] mb-10">
                                <Logo Color="#fff" className="cursor-pointer" />
                            </div>
                        </>
                    )}
                </Link>

                <div className="px-3 pt-6 lg:pt-0 flex flex-col bg-white dark:bg-black text-gray9 dark:text-gray1 md:overflow-y-auto h-full">
                    {/* <Link href="/dashboard">
                        <MenuItem
                            user={user}
                            iconString="Home"
                            className="mb-4"
                        />
                    </Link>
                    <MenuItem
                        user={user}
                        iconString="Search"
                        className="mb-4"
                    />
                    <MenuItem
                        user={user}
                        iconString="Explore"
                        className="mb-4"
                    />
                    <Link href="/messages">
                        <MenuItem
                            user={user}
                            iconString="Messages"
                            className="mb-4"
                        />
                    </Link>
                    <MenuItem
                        user={user}
                        iconString="Notifications"
                        className="mb-4"
                    /> */}
                    <Link href="/dashboard">
                        <MenuItem
                            user={user}
                            iconString="Home"
                            isActive={activeLink === 'Home'}
                            onClick={() => setActiveLink('Home')}
                        />
                    </Link>
                    <MenuItem
                        user={user}
                        iconString="Search"
                        isActive={activeLink === 'Search'}
                        onClick={() => setActiveLink('Search')}
                    />
                    <MenuItem
                        user={user}
                        iconString="Explore"
                        isActive={activeLink === 'Explore'}
                        onClick={() => setActiveLink('Explore')}
                    />
                    <Link href="/messages">
                        <MenuItem
                            user={user}
                            iconString="Messages"
                            isActive={activeLink === 'Messages'}
                            onClick={() => setActiveLink('Messages')}
                        />
                    </Link>
                    <MenuItem
                        user={user}
                        iconString="Notifications"
                        isActive={activeLink === 'Notifications'}
                        onClick={() => setActiveLink('Notifications')}
                    />
                    <button
                        onClick={() => {
                            setShowCreatePost(true);
                        }}
                    >
                        <MenuItem iconString="Create" className="mb-4" />
                    </button>
                    <Link href={route("profile.index")}>
                        <MenuItem
                            user={user}
                            iconString="Profile"
                            className="mb-4"
                        />
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="mt-0 mb-6 md:mt-8 lg:mt-0 xl:mt-[5vh]"
                    >
                        <MenuItem iconString="More" className="mb-4" />
                    </button>
                </div>

                {showMenu && (
                    <ul
                        ref={menuRef}
                        className={`absolute bottom-[140px] left-[65px] lg:bottom-[70px] lg:left-[20px] py-2 mt-2 w-56 z-50 bg-white dark:bg-[#18191A] text-gray9 dark:text-gray1 rounded-md shadow-xl ${showMenu ? "" : "hidden"
                            }`}
                    >
                        <li className="flex items-center p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm cursor-pointer">
                            <span className="mr-2">
                                <IoMdSettings size={20} />
                            </span>
                            Settings
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm cursor-pointer">
                            <span className="mr-2">
                                <IoMdBookmark size={20} />
                            </span>
                            Saved
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm cursor-pointer">
                            <span className="mr-2">
                                <ThemeSwitcher
                                    onThemeChange={handleThemeChange}
                                    string="Switch appearance"
                                />
                            </span>
                        </li>
                        <Link
                            className="flex items-center w-full p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm"
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            {/* <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full h-full"
                            > */}
                                {/* <MenuItem
                                    user={user}
                                    iconString="Log out"
                                    className="mb-4"
                                /> */}
                                <Logout />
                            {/* </Link> */}
                        </Link>
                    </ul>
                )}
                {showCreatePost && (
                    <CreatePostOverlay
                        onClose={() => setShowCreatePost(false)}
                        user={user}
                    />
                )}
            </div>

            <div className="grow bg-white dark:bg-black text-gray9 dark:text-gray1">
                <main className="h-full md:pl-[80px] lg:pl-[85px]">
                    {children}
                </main>
            </div>

            <div
                id="BottomNav"
                className="fixed z-30 bottom-0 w-full md:hidden flex items-center justify-around bg-white dark:bg-black text-gray9 dark:text-gray1 border-t py-2 border-t-gray3 dark:border-t-gray5"
            >
                <Link href="/dashboard">
                    <HomeRoundedIcon
                        fill="#000000"
                        size={40}
                        className="cursor-pointer"
                    />
                </Link>
                <ExploreRoundedIcon
                    fill="#000000"
                    size={40}
                    className="cursor-pointer"
                />
                <AccountCircleRoundedIcon
                    fill="#000000"
                    size={40}
                    className="cursor-pointer"
                />
                <AddRoundedIcon
                    onClick={() => {
                        setShowCreatePost(true);
                    }}
                    fill="#000000"
                    size={40}
                    className="cursor-pointer"
                />
                <Link href="/messages">
                    <SendRoundedIcon
                        fill="#000000"
                        size={40}
                        className="cursor-pointer"
                    />
                </Link>
                <Link href={route("profile.index")}>
                    <img
                        className="rounded-full w-[30px] cursor-pointer"
                        src={user.file}
                    />
                </Link>
            </div>

            {showCreatePost && (
                <CreatePostOverlay
                    onClose={() => setShowCreatePost(false)}
                    user={user}
                />
            )}
        </div>
    );
}
