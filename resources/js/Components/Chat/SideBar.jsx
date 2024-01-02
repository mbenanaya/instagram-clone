import { Link } from "@inertiajs/react"
import { useState, useEffect } from "react";


export default function SideBar({ recentMessages }) {

    return (
        <div className="flex flex-col justify-center mt-4">
            {recentMessages.map((user, index) => (
                <Link
                    href={route("chat.index", { userId: user.user_id })}
                    key={index}
                    className="flex justify-center transition px-8 py-3 hover:bg-gray3 dark:hover:bg-gray7 hover:cursor-pointer"
                >
                    <div className="md:pr-4 flex-none">
                        <img
                            src={"../" + user.file}
                            className="rounded-full w-[60px] h-[60px]"
                        />
                    </div>

                    <div className="hidden md:block grow">
                        <h3 className="text-sm">{user.name}</h3>
                        <p className="text-sm text-gray6 dark:text-gray4 font-light overflow-hidden h-5">
                            {user.message}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
