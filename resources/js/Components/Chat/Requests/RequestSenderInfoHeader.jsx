import { Link } from "@inertiajs/react"
import { CiVideoOn } from "react-icons/ci";
import { MessengerIcon } from "@/Components/icons/MessengerIcon";
import { BsTelephone } from "react-icons/bs";
import InfoIcon from "@mui/icons-material/Info";

export default function UserInfoHeader({ receiver, showInfos }) {

    const showChatInfos = () => {
        showInfos()
    }

    return (
        <div className="w-full h-16 border-b border-b-gray3 flex justify-between items-center flex-none px-6 py-9">
            <Link
                className="flex justify-center items-center"
                href={route("user.show", { id: receiver.id })}
            >
                <img
                    src={"../../" + receiver.file}
                    className="rounded-full w-[50px] h-[50px] mr-4"
                    alt={receiver.file}
                />
                <div className="font-extrabold text-md text-black dark:text-white">
                    {receiver.name}
                </div>
            </Link>
            <div className="flex justify-evenly items-center spaxe-x-4 p-2">
                <div className="p-2">
                    <BsTelephone size={25} />
                </div>
                <div className="p-2 text-black dark:text-white">
                    <CiVideoOn size={27} />
                </div>
                <div className="p-2 cursor-pointer">
                    <InfoIcon size={25} onClick={showChatInfos} />
                </div>
            </div>
        </div>
    )
}
