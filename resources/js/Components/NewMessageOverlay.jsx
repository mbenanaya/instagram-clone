import { useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
// import InputError from '@/Components/InputError'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

export default function NewMessageOverlay({ onClose, user }) {
  
    const closeOverlay = () => {
        onClose();
    }

    return (
        <div
            className="fixed z-50 top-0 left-0 flex justify-center items-center w-full h-screen bg-[#000000] bg-opacity-60 p-3"
        >
        	<Head title="New Message • Instagram" />

          	<div className="w-[80%] h-[60%] md:w-[50%] lg:w-[40%] bg-white text-black dark:bg-gray8 dark:text-white rounded-xl">
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
					<input type="text" placeholder="Search..." className="grow border-0 hover:border-0 focus:border-0 focus:outline-none shadow-none focus:ring-0 bg-white text-black dark:bg-gray8 dark:text-white" />
	            </div>

	            <div className="h-52 flex items-center bg-white text-gray3 dark:bg-gray8 dark:text-gray1 py-4 px-6 overflow-y-scroll">
	              	<p>No account found.</p>
	            </div>
	            <div className="h-12 px-4">
	            	<button
	            		className="h-full w-full bg-[#0095F6] hover:bg-[#2150fa] rounded-lg py-1 px-4 text-white text-center text-md font-bold"
	            	>
	            		Chat
	            	</button>
	            </div>
          </div>
        </div>
    );
}
