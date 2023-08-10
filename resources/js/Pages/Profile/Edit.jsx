import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react'

import { Tabs } from 'flowbite-react'
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Edit Profile " />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-col md:flex-row border border-gray4 dark:border-gray3">
                    <div className="md:w-1/4 border-l border-gray-200 dark:border-gray-700 m-0">
                        <nav className="flex flex-row flex-wrap md:flex-col max-w-[100%] md:space-y-2 pt-2 md:pt-0" aria-label="Tabs" role="tablist" data-hs-tabs-vertical="true">
                            <button
                                type="button"
                                className="hs-tab-active:border-pc hs-tab-active:text-purple-600 hs-tab-active:font-extrabold dark:hs-tab-active:text-pc py-2 px-1 word-wrap md:px-4 inline-flex items-center gap-2 border-b-[3px] md:border-b-0 md:border-l-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:bg-gray1 hover:border-l-gray3 active"
                                id="edit-profile"
                                data-hs-tab="#edit-profile-tab"
                                aria-controls="edit-profile-tab"
                                role="tab"
                            >
                                Edit profile
                            </button>
                            <button
                                type="button"
                                className="hs-tab-active:border-pc hs-tab-active:text-purple-600 hs-tab-active:font-extrabold dark:hs-tab-active:text-pc py-2 px-1 word-wrap md:px-4 inline-flex items-center gap-2 border-b-[3px] md:border-b-0 md:border-l-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:bg-gray1 hover:border-l-gray3"
                                data-hs-tab="#change-password-tab"
                                aria-controls="change-password-tab"
                                role="tab"
                            >
                                Change password
                            </button>
                            <button type="button" className="hs-tab-active:border-pc hs-tab-active:text-purple-600 hs-tab-active:font-extrabold dark:hs-tab-active:text-pc py-2 px-1 word-wrap md:px-4 inline-flex items-center gap-2 border-b-[3px] md:border-b-0 md:border-l-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:bg-gray1 hover:border-l-gray3" id="email-notifs" data-hs-tab="#email-notifs-tab" aria-controls="email-notifs-tab" role="tab">
                                Email notifications
                            </button>
                            <button type="button" className="hs-tab-active:border-pc hs-tab-active:text-purple-600 hs-tab-active:font-extrabold dark:hs-tab-active:text-pc py-2 px-1 word-wrap md:px-4 inline-flex items-center gap-2 border-b-[3px] md:border-b-0 md:border-l-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:bg-gray1 hover:border-l-gray3" id="push-notifs" data-hs-tab="#push-notifs-tab" aria-controls="push-notifs" role="tab">
                                Push notifications
                            </button>
                            <button type="button" className="hs-tab-active:border-pc hs-tab-active:text-purple-600 hs-tab-active:font-extrabold dark:hs-tab-active:text-pc py-2 px-1 word-wrap md:px-4 inline-flex items-center gap-2 border-b-[3px] md:border-b-0 md:border-l-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:bg-gray1 hover:border-l-gray3" id="delete-account" data-hs-tab="#delete-account-tab" aria-controls="delete-account-tab" role="tab">
                                Delete account
                            </button>
                        </nav>
                    </div>

                    <div className="md:w-3/4 border-t md:border-l md:border-t-0 border-gray4 dark:border-gray3 px-6">
                        <div id="edit-profile-tab" role="tabpanel" aria-labelledby="edit-profile">
                            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 ">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>
                        </div>
                        <div id="change-password-tab" className="hidden" role="tabpanel" aria-labelledby="change-password">
                            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>
                        </div>
                        <div id="email-notifs-tab" className="hidden" role="tabpanel" aria-labelledby="email-notifs">
                            <p className="text-gray-500 dark:text-gray-400">
                            This is the <em className="font-semibold text-gray-800 dark:text-gray-200">Email notifications</em>
                            </p>
                        </div>
                        <div id="push-notifs-tab" className="hidden" role="tabpanel" aria-labelledby="push-notifs">
                            <p className="text-gray-500 dark:text-gray-400">
                            This is the <em className="font-semibold text-gray-800 dark:text-gray-200">Push notifications</em>
                            </p>
                        </div>
                        <div id="delete-account-tab" className="hidden" role="tabpanel" aria-labelledby="delete-account">
                            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
