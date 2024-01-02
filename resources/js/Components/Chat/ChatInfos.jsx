import { useState } from "react"
import { motion as m } from "framer-motion"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Link } from "@inertiajs/react"
import DeleteChat from "./DeleteChat"

export default function ChatInfos({ isVisible, receiver, ShowDeleteChat, onClose }) {



    return (
        <m.div
            initial={{ x: '250%' }}
            animate={isVisible ? { x: "0%" } : { x: "250%" }}
            transition={{ ease: 'easeOut' }}
            exit={{ opacity: 1 }}
            className="h-full w-[250px] z-50 bg-white dark:bg-black border-l border-gray7 dark:border-slate-100 fixed top-0 right-0 overflow-y-auto"
        >
            <div className="flex justify-end items-center p-3 pt-5">
                <CloseRoundedIcon onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="px-5 pb-3">
                <h1 className="text-xl font-semibold">Details</h1>
            </div>
            <div className="flex justify-between items-center border-b dark:border-neutral-600 px-5 py-8">
                <h2>Mute messages</h2>
                <input type="checkbox" aria-checked="false" role="switch" />
            </div>
            <div className="flex flex-col justify-between items-start space-y-4 pb-24 h-52">
                <h3 className="p-6">Members</h3>
                <Link
                    href={route("user.show", {
                        id: receiver.id,
                    })}
                    className="flex justify-start items-center space-x-3 hover:bg-gray1 dark:hover:bg-gray7 w-full px-6 py-2"
                >
                    <img src={"../" + receiver.file} alt="" className="rounded-full w-[56px] h-[56px]" />
                    <div className="">
                        <h5 className="text-md">{receiver.username}</h5>
                        <p className="text-sm text-gray4">{receiver.name}</p>
                    </div>
                </Link>
            </div>
            <div className="border-t border-neutral-600 p-6">
                <div>
                    <button
                        className="text-red-600 m-4"
                        onClick={ShowDeleteChat}
                    >
                        Delete chat
                    </button>
                </div>
            </div>
        </m.div>
    )
}
