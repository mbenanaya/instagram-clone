import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        username: user.username,
        website: user.website,
        bio: user.bio,
        file: user.file,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    // const userFile = mix(`/images/${data.file}`)
    // const userFile = `../images/${data.file}`

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6 px-8">
                <div className="flex items-center justify-start space-x-8">
                    <img
                        src={"../" + data.file}
                        alt=""
                        className="rounded-full w-[38px] h-[38px]" />
                    <div className="text-black dark:text-white flex flex-col justify-center items-start">
                        <span>{data.username}</span>
                        <InputLabel htmlFor="fileUser" value="Change profile photo" className="text-[17px] text-blue-400 font-extrabold cursor-pointer" />
                        <input
                            id="fileUser"
                            type="file"
                            className="hidden"
                            // onChange={(e) => getUploadedImage(e)}
                        />
                    </div>
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <InputLabel htmlFor="name" value="Name" className="text-[17px] text-black dark:text-white font-extrabold" />

                    <TextInput
                        id="name"
                        className="block w-3/5"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <InputLabel htmlFor="username" value="Username" className="text-[17px] text-black dark:text-white font-extrabold" />

                    <TextInput
                        id="username"
                        className="block w-3/5"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <InputLabel htmlFor="website" value="Website" className="text-[17px] text-black dark:text-white font-extrabold" />

                    <TextInput
                        id="website"
                        className="block w-3/5"
                        value={data.website}
                        onChange={(e) => setData('website', e.target.value)}
                        required
                        isFocused
                        autoComplete="website"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <InputLabel htmlFor="bio" value="Bio" className="text-[17px] text-black dark:text-white font-extrabold" />

                    <textarea
                        rows="5"
                        cols="2"
                        id="bio"
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block w-3/5"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        required
                        isFocused
                        autoComplete="bio"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <InputLabel htmlFor="email" value="Email" className="text-[17px] text-black dark:text-white font-extrabold" />

                    <TextInput
                        id="email"
                        type="email"
                        className="block w-3/5"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-start">
                    <PrimaryButton className="w-[80px]" disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
