import { useForm } from '@inertiajs/react'
import { useState } from 'react'

export default function DeleteChat({ onClose, id }) {

    const { data, setData, delete: deleteChat, processing, errors, reset } = useForm()

    const closeOverlay = () => {
        onClose()
    }

    const DeleteChat = () => {
        deleteChat(route('chat.delete', { id: id }))
        onClose()
    }

    return (
        <div
            className="fixed flex items-center z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-60 p-3"
            style={{ marginLeft: '0' }}
        >
            <div className="max-w-sm w-full mx-auto mb-24 bg-white text-black dark:bg-[#262626] dark:text-white rounded-xl text-center">
                <div className="p-4 pt-6 text-[20px]">
                    Permanently delete chat?
                </div>
                <button
                    onClick={DeleteChat}
                    className="font-bold w-full text-red-600 dark:text-red-500 p-3 text-md border-b border-t border-neutral-300 dark:border-neutral-600 cursor-pointer"
                >
                    Delete
                </button>
                <div
                    className="p-3 text-md cursor-pointer"
                    onClick={closeOverlay}
                >
                    Cancel
                </div>
            </div>
        </div>
    )
}
