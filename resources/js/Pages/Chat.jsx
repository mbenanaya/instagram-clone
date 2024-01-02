import { useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatInfos from "@/Components/Chat/ChatInfos";
import ChatInput from "@/Components/Chat/ChatInput";
import ChatViewProfile from "@/Components/Chat/ChatViewProfile";
import MessagesSection from "@/Components/Chat/MessagesSection";
import NewMessageOverlay from "@/Components/NewMessageOverlay";
import SideBar from "@/Components/Chat/SideBar";
import UserInfoHeader from "@/Components/Chat/UserInfoHeader";

import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import DeleteChat from "@/Components/Chat/DeleteChat";

export default function Chat({ auth, receiver, messages, recentMessages, messageRequestsCount, userId }) {

    const [showNewMessageOverlay, setShowNewMessageOverlay] = useState(false)
    const [showDeleteChat, setShowDeleteChat] = useState(false)

    const divRef = useRef(null)
    const user = auth.user
    const [msges, setMessages] = useState(messages)

    useEffect(() => {
        scrollToBottom()
    }, [msges]);

    const scrollToBottom = () => {
        divRef.current.scrollTo({
            top: divRef.current.scrollHeight,
        });
    };

    useEffect(() => {
        const messageSentHandler = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.message])
        };

        Echo.private(`chat.${receiver.id}.${user.id}`)
            .listen("MessageSent", messageSentHandler)

        Echo.private(`chat.${user.id}.${receiver.id}`)
            .listen("MessageSent", messageSentHandler)

        return () => {
            Echo.leave(`chat.${receiver.id}.${user.id}`)
            Echo.leave(`chat.${user.id}.${receiver.id}`)
        };
    }, [receiver.id, user.id]);

    const [showChatInfos, setShowChatInfos] = useState(false)
    const showInfos = () => setShowChatInfos(!showChatInfos)

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Instagram • Direct" />
            <div className="flex h-screen">
                <div className="w-1/6 md:w-1/3 border-r border-gray3 text-black dark:text-white">
                    <div className="flex justify-center md:justify-between items-center pt-8 px-6">
                        <div className="text-[17px] hidden md:block font-extrabold">
                            {auth.user.username}
                        </div>
                        <PiNotePencil
                            size={26}
                            className="cursor-pointer"
                            onClick={() => {
                                setShowNewMessageOverlay(true);
                            }}
                        />
                    </div>
                    <div className="hidden md:flex justify-between items-center pt-8 px-6">
                        <div className="font-bold">Messages</div>
                        <Link href={route('messages.requests')} className="font-bold text-gray5">
                            {messageRequestsCount > 0 ? (
                                <span className="text-blue-500 font-semibold">Requests ({messageRequestsCount}) </span>
                            ) : (
                                <span className="">Requests</span>
                            )
                            }
                        </Link>
                    </div>

                    <SideBar recentMessages={recentMessages} />
                </div>

                <div className="w-5/6 md:w-2/3 h-full">
                    {receiver?.id ? (
                        <>
                            <div className="flex flex-col h-full">
                                <UserInfoHeader showInfos={showInfos} receiver={receiver} />
                                <div
                                    ref={divRef}
                                    className="grow overflow-y-auto p-4"
                                >
                                    <ChatViewProfile receiver={receiver} />

                                    <MessagesSection
                                        messages={msges}
                                        user={auth.user}
                                        receiver={receiver}
                                    />
                                </div>

                                <ChatInput
                                    user={auth.user}
                                    receiver={receiver}
                                    scrollToBottom={scrollToBottom}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {showNewMessageOverlay && (
                                <NewMessageOverlay
                                    onClose={() =>
                                        setShowNewMessageOverlay(false)
                                    }
                                    user={auth.user}
                                />
                            )}
                        </>
                    )}
                </div>

                {showInfos && (
                    <ChatInfos
                        receiver={receiver}
                        ShowDeleteChat={() => setShowDeleteChat(true)}
                        isVisible={showChatInfos}
                        onClose={() => setShowChatInfos(false)}
                    />
                )}

                {showDeleteChat && (
                    <DeleteChat
                        onClose={() => setShowDeleteChat(false)}
                        id={userId}
                    />
                )}

            </div>
        </AuthenticatedLayout>
    );
}
