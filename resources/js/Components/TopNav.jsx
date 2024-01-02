import { Link } from "@inertiajs/react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import MenuItem from '@/Components/MenuItem';
import ThemeSwitcher from "@/Components/ThemeSwitcher";

export default function TopNav() {
    return (
        <div
            id="TopNavHome"
            className="fixed z-30 block md:hidden w-full bg-white h-[61px] border-b border-b-gray3 dark:border-b-gray7 dark:bg-black text-gray9 dark:text-gray1 py-4"
        >
            <div className="flex items-center justify-between h-full py-2">
                <Link href="/dashboard">
                    <img
                        className="w-[100px] ml-6 cursor-pointer"
                        src="images/insta-logo.png"
                    />
                </Link>

                <div className="flex items-center w-[50%]">
                    <div className="flex items-center w-full bg-gray1 rounded-lg mr-2">
                        <SearchRoundedIcon
                            className="z-20"
                            fill="#f00"
                            size={56}
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="
                        bg-transparent
                        w-full
                        placeholder-[#8E8E8E]
                        border-0
                        ring-0
                        focus:ring-0
                      "
                        />
                    </div>

                    <FavoriteBorderRoundedIcon
                        className="mr-2"
                        fill="#f00"
                        size={56}
                    />
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
}
