import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NewMessageOverlay from "@/Components/NewMessageOverlay";
import { MessengerIcon } from "@/Components/icons/MessengerIcon";
import { Head, Link, useForm } from "@inertiajs/react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

export default function HiddenRequests({ auth }) {
    const user = auth.user;
    const [showNewMessageOverlay, setShowNewMessageOverlay] = useState(false);
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Messages" />
            <div className="flex h-screen">
                <div className="w-1/6 md:w-1/3 border-r border-gray3 text-black dark:text-white">
                    <div className="flex justify-center md:justify-between items-center pt-8 px-4">
                        <Link href="/messages/requests">
                            <ArrowBackRoundedIcon />
                        </Link>
                        <h1 className="text-2xl font-bold">Hidden requests</h1>
                    </div>
                    <div className="hidden md:flex justify-between items-center pt-8 px-6">
                        <div className="font-bold">Messages</div>
                        <Link href={route('messages.requests')} className="font-bold text-gray5">Request</Link>
                    </div>

                    <div className="flex flex-col justify-center mt-4">
                    </div>
                </div>

                <div className="w-5/6 md:w-2/3 flex justify-center items-center h-full">
                    <div className="flex flex-col justify-center items-center">
                        <MessengerIcon />
                        <h1 className="text-xl my-2">Your messages</h1>
                        <p className="text-sm mb-4 text-gray5 dark:text-gray4">
                            Send private photos and messages to a friend or
                            group
                        </p>
                        <button
                            className="bg-[#0095F6] hover:bg-[#2150fa] rounded-lg py-1 px-4 text-white text-md font-bold"
                            onClick={() => {
                                setShowNewMessageOverlay(true);
                            }}
                        >
                            Send message
                        </button>
                    </div>
                </div>
                {showNewMessageOverlay && (
                    <NewMessageOverlay
                        onClose={() => setShowNewMessageOverlay(false)}
                        user={user}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    )
}
