export default function MessageSection({ request, sender }) {

    const formatCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        const today = new Date();

        const isSameDay = date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        if (isSameDay) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year}, ${hours}:${minutes}`;
        }
    }

    return (
        <div className="flex flex-col space-y-3 w-full px-4 mb-4">
            <div className="text-sm text-center text-gray5"> {formatCreatedAt(request.created_at)} </div>
            <div
                className='flex justify-between space-x-2 items-center max-w-[80%] self-start flex-row'
            >
                <img src={"../../" + sender.file} className="rounded-full w-[35px] h-[35px]" alt="" />
                <p
                    className='px-3 py-1.5 text-sm rounded-full bg-gray2 text-black dark:bg-gray7 dark:text-white'
                >
                    {request.message}
                </p>
            </div>
        </div>
    )
}
