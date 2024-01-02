import { LuLogOut } from "react-icons/lu";

export const Logout = () => {
    return (
        <div className="flex items-center justify-start pl-1 space-x-6">
            <span className="mr-2">
                <LuLogOut size={20} />
            </span>
            Logout
        </div>
    )
}
