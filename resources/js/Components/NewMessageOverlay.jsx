import { useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
// import InputError from '@/Components/InputError'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { FaXmark } from "react-icons/fa6";

export default function NewMessageOverlay({ onClose, user, followingUsers }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        searchText: '',
    })

    const [selectedUsers, setSelectedUsers] = useState([]);

    const closeOverlay = () => {
        onClose();
    };

    const handleSelectUser = (selectedUser, isChecked) => {
        if (isChecked) {
            setSelectedUsers([...selectedUsers, selectedUser]);
        } else {
            setSelectedUsers(selectedUsers.filter(user => user.id !== selectedUser.id));
        }
    };

    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
    };

    const filteredUsers = followingUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(data.searchText.toLowerCase()) ||
            user.username.toLowerCase().includes(data.searchText.toLowerCase())
    )


    return (
        <div
            className="fixed z-50 top-0 left-0 flex justify-center items-center w-full h-screen bg-[#363636] bg-opacity-60 p-3 pt-0"
        >
            <Head title="New Message • Instagram" />

            <div className="w-[80%] h-[60%] md:w-[550px] bg-white text-black dark:bg-[#363636] dark:text-white rounded-xl">
                <div className="flex items-center w-full rounded-t-xl p-4 border-b border-b-gray-300">
                    <div className="grow text-lg text-center font-extrabold">New Mesage</div>
                    <button
                        onClick={closeOverlay}
                        className="flex-none text-lg hover:text-gray-900 font-extrabold"
                    >
                        <CloseRoundedIcon size={27} />
                    </button>
                </div>

                <div className="flex items-center w-full rounded-t-xl py-1 px-4 border-b border-b-gray-300">
                    <h4 className="font-extrabold">To:</h4>
                    <input
                        className="grow border-0 hover:border-0 focus:border-0 focus:outline-none shadow-none focus:ring-0 bg-white text-black dark:bg-[#363636] dark:text-white"
                        type="text"
                        placeholder="Search..."
                        value={data.searchText}
                        onChange={(e) => setData('searchText', e.target.value)}
                    />
                </div>
                <div className="py-1 px-4 border-t border-b border-gray-300">
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center bg-[#E0F1E1] text-[#0095F6] rounded-full py-1 px-2"
                            >
                                <span className="mr-2 text-[0.85rem]">{user.name}</span>
                                <button
                                    onClick={() => handleRemoveUser(user.id)}
                                    className="text-[#0095F6] focus:outline-none"
                                >
                                    <FaXmark />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white text-gray3 dark:bg-[#363636] dark:text-gray1 overflow-y-scroll">

                    {filteredUsers.length === 0 && (
                        <p className="py-4 px-2 text-center text-gray5 dark:text-gray4">
                            No account found.
                        </p>
                    )}
                    {filteredUsers.map((user) => (
                        <label
                            htmlFor={`user.${user.id}`}
                            key={user.id}
                            className="flex justify-between items-center mb-2 hover:bg-gray1 dark:hover:bg-gray7 cursor-pointer px-4 py-3 mt-1"
                        >
                            <div className="flex justify-center items-center space-x-3">
                                <img
                                    src={user.file}
                                    className="rounded-full w-[44px] h-[44px]"
                                    alt=""
                                />
                                <div>
                                    <h5 className="text-[14px]">{user.name}</h5>
                                    <p className="text-sm text-gray5">{user.username}</p>
                                </div>
                            </div>
                            <div>
                                <input
                                    id={`user.${user.id}`}
                                    type="checkbox"
                                    value=""
                                    checked={selectedUsers.some(u => u.id === user.id)}
                                    onChange={(e) => handleSelectUser(user, e.target.checked)}
                                    className="w-4 h-4 rounded-full p-1 text-pc bg-gray-100 border-gray-300 focus:ring-pc dark:focus:ring-pc dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </label>
                    ))}

                </div>
                <div className="px-4 py-3 bg-white dark:bg-[#363636] rounded-b-xl">
                    <button
                        className="h-full w-full bg-[#0095F6] hover:bg-[#2150fa] rounded-lg py-2.5 px-4 text-white text-center text-md font-bold"
                    >
                        Chat
                    </button>
                </div>
            </div>
        </div>
    );
}
