import { Link } from "@inertiajs/react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

export default function TopNavUser({ user }) {
    return (
        <div>
            <div
                id="TopNavUser"
                className="md:hidden fixed flex items-center justify-between z-30 w-full bg-white dark:bg-black text-gray9 dark:text-gray1 h-[61px] border-b border-b-gray-300"
            >
                <Link href="/dashboard" className="px-4">
                    <ChevronLeftRoundedIcon
                        size={30}
                        className="cursor-pointer"
                    />
                </Link>
                <div className="font-extrabold text-lg">{user.username}</div>
                <PersonAddRoundedIcon
                    size={30}
                    className="cursor-pointer px-4"
                />
            </div>
        </div>
    );
}
