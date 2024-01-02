import { useContext } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { ThemeContext } from "@/Components/ThemeProvider";

export default function Guest({ children }) {
    const { theme, handleThemeChange } = useContext(ThemeContext);
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-black">
            <div>
                <Link href="/">
                    <ApplicationLogo theme={theme} className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-950 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
