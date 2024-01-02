import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Eye } from "@/Components/icons/Eye";
import { FaChevronRight } from "react-icons/fa6";
import { UserAndArrow } from "@/Components/icons/UserAndArrow";
import RequestSidebar from "@/Components/Chat/Requests/RequestSidebar";

export default function MessageRequest({ auth, requests }) {

    console.log(requests)

    const user = auth.user;
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Messages" />
            <div className="flex h-screen">

                <RequestSidebar requests={requests} />

                <div className="w-5/6 md:w-2/3 flex justify-center items-center h-full">
                    <div className="flex flex-col justify-center items-center">
                        <span className="rounded-full flex justify-center items-center w-24 h-24 border-2 border-black dark:border-white">
                            <UserAndArrow />
                        </span>
                        <h1 className="text-xl my-2">Message requests</h1>
                        <p className="text-sm text-center mb-4 max-w-[80%] text-gray5 dark:text-gray4">
                            These messages are from people you've restricted or don't follow. They won't know you viewed their request until you allow them to message you.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
