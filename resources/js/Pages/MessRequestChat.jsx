import { useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatInfos from "@/Components/Chat/ChatInfos";
import ChatViewProfile from "@/Components/Chat/Requests/ViewProfile";
import UserInfoHeader from "@/Components/Chat/Requests/RequestSenderInfoHeader";

import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import RequestSidebar from "@/Components/Chat/Requests/RequestSidebar";
import DeleteRequest from "@/Components/Chat/Requests/DeleteRequest";
import MessageSection from "@/Components/Chat/Requests/MessageSection";

export default function Chat({ auth, sender, requests, messageRequest }) {

    const { data, setData, post, processing, errors, reset } = useForm()
    const request = messageRequest
    const [showChatInfos, setShowChatInfos] = useState(false)
    const [showDeleteRequest, setShowDeleteRequest] = useState(false)
    const showInfos = () => setShowChatInfos(!showChatInfos)
    const AcceptRequest = () => {
        post(route('acceptRequest', { id: request.id }))
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Instagram • Direct" />
            <div className="flex h-screen">
                <RequestSidebar requests={requests} />
                <div className="w-5/6 md:w-2/3 h-full">
                    <div className="flex flex-col h-full">
                        <UserInfoHeader showInfos={showInfos} receiver={sender} />
                        <div
                            className="grow overflow-y-auto pt-4"
                        >
                            <ChatViewProfile receiver={sender} />

                            <MessageSection request={request} sender={sender} />

                            <div className="fixed inset-y-auto">
                                <div className="py-2 px-7 text-center border-t border-b border-neutral-300 dark:border-neutral-600">
                                    <h4 className="font-normal text-[14px]">Accept message request from {sender.name} ({sender.username})?</h4>

                                    <p className="text-[12px] mt-2 text-gray7 dark:text-gray4">If you accept, they will also be able to call you and see info such as your activity status and when you've read messages.</p>
                                </div>
                                <div className="flex">
                                    <ul className="w-full flex items-center p-4">
                                        <li className="w-1/3 flex justify-center items-center h-4 font-semibold p-4 border-r border-neutral-300 dark:border-neutral-600">
                                            <button className=" text-red-500">Block</button>
                                        </li>
                                        <li className="w-1/3 flex justify-center items-center h-4 font-semibold p-4 border-r border-neutral-300 dark:border-neutral-600">
                                            <button
                                                className="text-red-500"
                                                onClick={() => setShowDeleteRequest(true)}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                        <li className="w-1/3 flex justify-center items-center h-4 font-semibold p-4">
                                            <button
                                                className="text-black dark:text-white"
                                                onClick={AcceptRequest}
                                            >
                                                Accept
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {showInfos && (
                    <ChatInfos receiver={sender} isVisible={showChatInfos} onClose={() => setShowChatInfos(false)} />
                )}

                {showDeleteRequest && (
                    <DeleteRequest
                        onClose={() => setShowDeleteRequest(false)}
                        request={request.id}
                    />
                )}

            </div>
        </AuthenticatedLayout>
    );
}
