import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md mt-8 px-12 py-4 bg-white dark:bg-gray-800 border border-gray2 dark:border-gray7 drop-shadow-lg overflow-hidden">
                {children}
            </div>
        </div>
    );
}
