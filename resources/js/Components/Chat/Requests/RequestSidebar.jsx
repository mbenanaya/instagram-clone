import { Link } from '@inertiajs/react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Eye } from '@/Components/icons/Eye'
import { FaChevronRight } from 'react-icons/fa6'

export default function RequestSidebar({ requests }) {

    const calculateTimeDifference = (createdAt) => {
        const creationDate = new Date(createdAt);
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - creationDate;
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

        const timeUnits = [
            { unit: 'w', seconds: 604800 },
            { unit: 'd', seconds: 86400 },
            { unit: 'h', seconds: 3600 },
            { unit: 'm', seconds: 60 },
            { unit: 's', seconds: 1 },
        ];

        for (let i = 0; i < timeUnits.length; i++) {
            const { unit, seconds } = timeUnits[i];
            const unitDifference = Math.floor(differenceInSeconds / seconds);

            if (unitDifference >= 2 && unit !== 's') {
                return `${unitDifference}${unit}`;
            }
        }

        return '1m'
    }

    const goBack = () => {
        window.history.back()
    }

    return (
        <div className="w-1/6 md:w-1/3 border-r border-gray3 text-black dark:text-white">
            <div className="flex justify-center md:justify-between items-center pt-8 px-4">
                <button onClick={goBack}>
                    <ArrowBackRoundedIcon />
                </button>

                <h1 className="text-2xl font-bold">Message requests</h1>
            </div>
            <Link
                href={route('requests.hidden')}
                className="hidden md:flex justify-between items-center pt-8 px-4"
            >
                <div className="flex items-center justify-center space-x-2">
                    <span className="rounded-full flex justify-center items-center bg-[#18191A] w-12 h-12">
                        <Eye />
                    </span>
                    <span className="text-[14px]">Hidden Request</span>
                </div>
                <FaChevronRight />
            </Link>

            <div className="flex flex-col justify-center mt-4">
                {requests.map((user, index) => (
                    <Link
                        href={route('request.index', {
                            senderId: user.user_id,
                        })}
                        key={index}
                        className="flex justify-center transition px-8 py-3 hover:bg-gray3 dark:hover:bg-gray7 hover:cursor-pointer"
                    >
                        <div className="md:pr-4 flex-none">
                            <img
                                src={'../../' + user.file}
                                className="rounded-full w-[60px] h-[60px]"
                            />
                        </div>

                        <div className="hidden md:block grow">
                            <h3 className="text-sm">{user.name}</h3>
                            <p className="text-sm text-gray6 dark:text-gray4 font-light overflow-hidden h-5">
                                {user.message} {' • '}
                                {calculateTimeDifference(user.created_at)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
