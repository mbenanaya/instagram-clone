import { useEffect, useState } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState('light');

    const handleThemeSwitch = () => {
        const updatedTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(updatedTheme)
    };

    // useEffect(() => {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         setTheme('dark')
    //     } else {
    //         setTheme('light')
    //     }
    // }, [])

    useEffect(() => {
        const body = document.querySelector('body');
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }, [theme])

    return (
        <div>
            {theme === 'light' ? (
                <DarkModeOutlinedIcon
                    className="text-black hover:text-gray-600 dark:text-ternary-light dark:hover:text-primary-light text-xl cursor-pointer"
                    onClick={handleThemeSwitch}
                />
            ) : (
            <LightModeOutlinedIcon
                    className="text-white hover:text-gray-300 text-xl cursor-pointer"
                    onClick={handleThemeSwitch}
                />
            )}
        </div>
    );
}
