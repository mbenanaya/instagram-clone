import { Link } from "@inertiajs/react"

export default function ChatViewProfile({receiver}) {
    return(
        <div className="flex flex-col justify-center items-center mb-24">
            <img
                src={"../" + receiver.file}
                className="rounded-full w-[90px] h-[90px]"
                alt={receiver.file}
            />
            <h3 className="text-xl font-extrabold mt-2">
                {receiver.name}
            </h3>
            <p className="text-sm text-gray5 dark:text-gray4 mt-2 mb-4">
                {receiver.username} · Instagram
            </p>
            <Link
                href={route("user.show", {
                    id: receiver.id,
                })}
                className="md:block hidden py-2 px-4 rounded-lg text-[16px] font-extrabold bg-gray1 hover:bg-gray2 dark:bg-gray7 dark:text-white"
            >
                View profile
            </Link>
        </div>
    )
}
