import { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import NewMessageOverlay from '@/Components/NewMessageOverlay'
import { MessengerIcon } from '@/Components/icons/MessengerIcon'
import { Head, Link, useForm } from '@inertiajs/react'
import { PiNotePencil } from 'react-icons/pi'

export default function Messages({ auth, messages, recentMessages }) {

    console.log(recentMessages)

    const user = auth.user
    const [showNewMessageOverlay, setShowNewMessageOverlay] = useState(false)

	return (
		<AuthenticatedLayout user={user} >
            <Head title="Messages" />
            <div className="flex h-screen">
            	<div className="w-1/6 md:w-1/3 border-r border-gray3 text-black dark:text-white">
            		<div className="flex justify-center md:justify-between items-center pt-8 px-6">
                        <div className="text-[17px] hidden md:block font-extrabold">{user.username}</div>
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
                        <div className="font-bold text-gray5">Request</div>
                    </div>

                    <div className="flex flex-col justify-center mt-4">
                        {recentMessages.map((user, index) => (
                            <Link
                                href={route('chat.index', {userId: user.user_id})}
                                key={index}
                                className="flex transition px-8 py-3 hover:bg-gray3 dark:hover:bg-gray7 hover:cursor-pointer"
                            >
                                <div className="md:pr-4 flex-none">
                                    <img src={"../"+user.file} className="rounded-full w-[60px] h-[60px]" />
                                </div>

                                <div className="hidden md:block grow">
                                    <h3 className="text-sm">
                                       {user.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-light overflow-hidden h-5">
                                        {user.message}
                                    </p>
                                </div>
                            </Link>
                        ))
                        }

                    </div>
                    
            	</div>

            	<div className="w-5/6 md:w-2/3 flex justify-center items-center h-full">

            		<div className="flex flex-col justify-center items-center">
                        <MessengerIcon />
                        <h1 className="text-xl my-2">Your messages</h1>
                        <p className="text-sm mb-4 text-gray5 dark:text-gray4">Send private photos and messages to a friend or group</p>
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
                    <NewMessageOverlay onClose={() => setShowNewMessageOverlay(false)} user={user} />
                )}

            </div>
        </AuthenticatedLayout>
    )
}