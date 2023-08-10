import ApplicationLogo from '@/Components/ApplicationLogo';
import Navbar from '@/Components/Navbar';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password  • Instagram" />
            <Navbar />
                
            <div className="pt-8">
                <GuestLayout>
                    <div className="px-6 pb-6">
                        <div className="my-4">
                            <ApplicationLogo />
                        </div>
                        <h1 className="mb-4 text-gray9 dark:text-gray2 font-semibold text-center">Trouble logging in?</h1>

                        <div className="mb-4 text-sm text-gray6 dark:text-gray3">
                            Enter your email and we'll send you a link to get back into your account.
                        </div>

                        {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

                        <form onSubmit={submit}>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                placeholder="Email"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />

                            <div className="flex items-center justify-center mt-4">
                                <PrimaryButton disabled={processing}>
                                    Send Password Reset Link
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </GuestLayout>
            </div>
        </>
    );
}
