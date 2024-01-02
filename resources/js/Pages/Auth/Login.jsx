import { useContext } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { ThemeContext } from "@/Components/ThemeProvider";
import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Navbar from "@/Components/Navbar";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Login({ status, canResetPassword }) {
    const { theme, handleThemeChange } = useContext(ThemeContext)

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const images = [
        "images/img1.png",
        "images/img2.png",
        "images/img3.png",
        "images/img4.png",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Head title="Instagram" />
            <Navbar />
            <div className="h-screen flex flex-row items-start justify-evenly pt-8 mt-12 mb-0 px-2 bg-gray1 dark:bg-black selection:bg-purple-500 selection:text-white md:space-x-8 xl:pt-24">
                <div className="hidden md:block">
                    <div
                        className="relative bg-no-repeat w-[425px] h-[585px]"
                        style={{ backgroundImage: 'url("/images/phones.png")' }}
                    >
                        <img
                            src={images[currentImage]}
                            className="relative h-[537px] top-[28px] left-[157px]"
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex flex-col justify-center h-full bg-white dark:bg-gray-950 border border-gray2 dark:border-gray7 drop-shadow-lg px-12 pb-4 mt-16 md:mt-0 md:px-6 lg:px-16">
                        <div className="py-6">
                            <ApplicationLogo theme={theme} />
                        </div>
                        <div className="flex justify-center">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        placeholder="Email"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <PrimaryButton
                                        className=""
                                        disabled={processing}
                                    >
                                        Log in
                                    </PrimaryButton>
                                </div>

                                <div className="flex items-center justify-center mt-4">
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-blue-500 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray8"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>
                                <div className="flex items-center justify-center mt-4 text-gray9 dark:text-gray1">
                                    <p>
                                        Don't have an account?
                                        <Link
                                            href={route("register")}
                                            className="pl-1 font-bold text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
