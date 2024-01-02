import { useForm } from '@inertiajs/react'

export default function UnfollowOverlay({ onClose, follower, following }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        follower_id: follower,
        following_id: following,
    })

    const closeOverlay = () => {
        onClose()
    }

    const Unfollow = () => {
        post(route('unfollow'))
        onClose()
    }

    return (
        <div
            className="fixed flex items-center z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-60 p-3"
            style={{ marginLeft: '0' }}
        >
            <div className="max-w-sm w-full mx-auto mb-24 bg-white text-black dark:bg-gray8 dark:text-white rounded-xl text-center">
                <button
                    onClick={Unfollow}
                    className="font-extrabold w-full text-red-600 dark:text-red-500 p-3 text-lg border-b border-b-gray-300 cursor-pointer"
                >
                    Unfollow
                </button>
                <div
                    className="p-3 text-lg cursor-pointer"
                    onClick={closeOverlay}
                >
                    Cancel
                </div>
            </div>
        </div>
    )
}
