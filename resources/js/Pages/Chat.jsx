import { useState, useEffect, useRef } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import NewMessageOverlay from '@/Components/NewMessageOverlay'
import { MessengerIcon } from '@/Components/icons/MessengerIcon'

import { CiVideoOn } from 'react-icons/ci'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { BsFillCaretUpFill } from 'react-icons/bs'
import InfoIcon from '@mui/icons-material/Info';
import { PiNotePencil } from 'react-icons/pi'
import { BsTelephone } from 'react-icons/bs'

export default function Chat({ auth, receiver, messages, recentMessages }) {

    console.log(recentMessages)

    const [showNewMessageOverlay, setShowNewMessageOverlay] = useState(false)

    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }, []);

	return (
		<AuthenticatedLayout user={auth.user} >
            <Head title="Instagram • Direct" />
            <div className="flex h-screen">
            	<div className="w-1/6 md:w-1/3 border-r border-gray3 text-black dark:text-white">
            		<div className="flex justify-center md:justify-between items-center pt-8 px-6">
                        <div className="text-[17px] hidden md:block font-extrabold">{auth.user.username}</div>
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

            	<div className="w-5/6 md:w-2/3 h-full">

            		<div className="flex flex-col h-full">
                        <div className="w-full h-16 border-b border-b-gray3 flex justify-between items-center flex-none px-6 py-9">
                            <Link
                                className="flex justify-center items-center"
                                href={route('user.show', {id: receiver.id})}
                            >
                                <img src={'../'+receiver.file} className="rounded-full w-[50px] h-[50px] mr-4" alt="User Avatar" />
                                <div className="font-extrabold text-md text-black dark:text-white">
                                    {receiver.name}
                                </div>
                            </Link>
                            <div className="flex justify-evenly items-center spaxe-x-4 p-2" >
                                <div className="p-2"><BsTelephone size={25} /></div>
                                <div className="p-2 text-black dark:text-white"><CiVideoOn size={27} /></div>
                                <div className="p-2 cursor-pointer"><InfoIcon size={25} /></div>
                            </div>
                        </div>
                        <div ref={divRef} className="grow overflow-y-auto p-4">

                            <div className="flex flex-col justify-center items-center mb-24">
                                <img src={'../'+receiver.file} className="rounded-full w-[90px] h-[90px]" alt="User Avatar" />
                                <h3 className="text-xl font-extrabold mt-2">{receiver.name}</h3>
                                <p className="text-sm text-gray5 dark:text-gray4 mt-2 mb-4">{receiver.username} · Instagram</p>
                                <Link
                                    href={route('user.show', {id: receiver.id})}
                                    className="md:block hidden py-2 px-4 rounded-lg text-[16px] font-extrabold bg-gray1 hover:bg-gray2 dark:bg-gray7 dark:text-white"
                                >
                                    View profile
                                </Link>
                            </div>

                            {messages.map((message) => {
                                const createdAt = new Date(message.created_at);
                                const today = new Date();
                                const isToday = today.toDateString() === createdAt.toDateString();

                                let formattedTime;
                                if (isToday) {
                                    formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
                                } else {
                                const day = createdAt.getDate();
                                const month = createdAt.getMonth() + 1;
                                const year = createdAt.getFullYear();
                                formattedTime = `${day}/${month}/${year}, ${createdAt.getHours()}:${createdAt.getMinutes()}`;
                                }

                                return (
                                    <div key={message.id} className="flex flex-col space-y-6 w-full mb-4">
                                        <div className="text-sm text-center text-gray5">{formattedTime}</div>
                                        <div
                                            className={`px-3 py-1.5 text-sm max-w-[80%] rounded-full mb-2 ${
                                            message.sender_id !== auth.user.id
                                            ? 'self-start bg-gray2 text-black dark:bg-gray7 dark:text-white'
                                            : 'self-end bg-[#0095F6] text-white'
                                            }`}
                                        >
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                        <div className="w-full px-4">
                            <div className="mx-auto">
                                <textarea className="rounded-full dark:bg-gray9 dark:text-white w-full border border-gray3 dark:border-gray2 outline-0 focus:outline-none focus:border-gray2 shadow-none focus:ring-0 focus:outline dark:placeholder-white pt-3 h-12 oveflow-y-auto font-light pl-4" placeholder="Message..."></textarea>
                            </div>

                        </div>

                    </div>
                    
            	</div>
                {showNewMessageOverlay && (
                    <NewMessageOverlay onClose={() => setShowNewMessageOverlay(false)} user={auth.user} />
                )}

            </div>
        </AuthenticatedLayout>
    )
}