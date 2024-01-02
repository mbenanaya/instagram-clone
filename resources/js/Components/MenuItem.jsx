import React, { useContext } from "react";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { SendIcon } from "./icons/SendIcon";
import { ThemeContext } from "./ThemeProvider";
import { HomeIcon } from "./icons/HomeIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { ExploreIcon } from "./icons/ExploreIcon";
import { HeartIcon } from "./icons/HeartIcon";
import { AddIcon } from "./icons/AddIcon";
import { ReelsIcon } from "./icons/ReelsIcon";

const MenuItem = ({ user, iconString, onClick, isActive }) => {
    const { theme, handleThemeChange } = useContext(ThemeContext);
    let icon = null;

    if (iconString === "Home") { icon = HomeIcon }
    if (iconString === "Search") { icon = SearchIcon }
    if (iconString === "Explore") { icon = ExploreIcon }
    if (iconString === "Reels") { icon = ReelsIcon }
    if (iconString === "Messages") { icon = SendIcon }
    if (iconString === "Notifications") { icon = HeartIcon }
    if (iconString === "Create") { icon = AddIcon }
    if (iconString === "Profile") { icon = AccountCircleRoundedIcon }
    if (iconString === "More") { icon = MenuRoundedIcon }

    return (
        <div
            className={`w-full lg:inline-block lg:hover:bg-gray1 hover:bg-gray1 lg:dark:hover:bg-gray7 p-2 rounded-lg transition duration-300 ease-in-out cursor-pointer mb-2 lg:mb-2 bg-white dark:bg-black text-gray9 dark:text-gray1 ${isActive ? 'font-extrabold' : ''
                }`}
            onClick={onClick}
        >
            <div className="flex justify-center lg:justify-start items-center">
                {iconString === "Profile" ? (
                    <img
                        className={`rounded-full ml-[2px] lg:ml-0 w-[30px] h-[30px] cursor-pointer ${iconString === "Profile" ? "mr-1" : ""
                            }`}
                        src={user.file}
                    />
                ) : (
                    React.createElement(icon, { fill: "#000", size: 40 })
                )}
                <span className="lg:block hidden text-gray9 dark:text-gray1 text-[18px] pl-2 mt-0.5">
                    {iconString}
                </span>
            </div>
        </div>
    );
};

export default MenuItem;
