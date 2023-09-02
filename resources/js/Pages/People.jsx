import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TopNav from '@/Components/TopNav'
import { Head, Link, useForm } from '@inertiajs/react'

export default function People({ auth, users }) {

	const currentYear = new Date().getFullYear()

	return (
		<AuthenticatedLayout user={auth.user} >
            <Head title="People" />
            <TopNav />
            <div className="flex flex-col justify-center items-center space-y-12 pb-12">
                <div className="flex justify-center w-full bg-white dark:bg-gray9 pt-12">
                    <div
                        id="SuggestionsSection"
                        className="flex flex-col justify-center items-center w-full sm:w-11/12 lg:w-8/12 mt-8 lg:mt-0"
                    >
                        <div className="self-start font-extrabold text-black dark:text-white py-3 mb-2">
                            Suggestions for you
                        </div>
                        {users.map((randUser) => (
                            <div
                                key={randUser.id}
                                className="w-full flex items-center mb-2"
                            >
                                <Link
                                    href={route('user.show', { id: randUser.id })}
                                    className="flex-none w-14 pb-2"
                                >
                                    <img
                                        className="rounded-full w-[45px] h-[45px]"
                                        src={randUser.file}
                                    />
                                </Link>
                                <div className="pl-2 flex-initial w-96">
                                    <div className="text-black dark:text-white font-bold">
                                        {randUser.username}
                                    </div>
                                    <div className="text-gray5 dark:text-gray4 text-extrabold text-sm">
                                        {randUser.name}
                                    </div>
                                    <div className="text-gray5 dark:text-gray4 text-extrabold text-sm">
                                        Popular
                                    </div>
                                </div>
                                
                                <button
                                    className="py-2 px-6 flex-none w-24 rounded-lg text-sm font-extrabold text-white bg-[#0095F6] hover:bg-[#2140fa]"
                                    onClick={() => {
                                        setSelectedUserId(randUser.id)
                                        setData('following_id', randUser.id)
                                        follow()
                                    }}
                                >
                                    Follow
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="w-full text-center text-sm text-gray-400">
                        <ul className="flex flex-wrap items-center justify-center space-x-4 space-y-2 px-4">
                            <li>Meta</li>
                            <li>About</li>
                            <li>Blog</li>
                            <li>Jobs</li>
                            <li>Help</li>
                            <li>API</li>
                            <li>Privacy</li>
                            <li>Terms</li>
                            <li>Top Accounts</li>
                            <li>Locations</li>
                            <li>Instagram Lite</li>
                            <li>Threads</li>
                            <li>Contact Uploading & Non-Users</li>
                            <li>Meta Verified</li>
                        </ul>
                    </div>
                    <div className="text-center text-sm text-gray-400 mt-4">
                        English © {currentYear} Instagram from Meta
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
	)
}