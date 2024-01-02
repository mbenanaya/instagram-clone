import { useContext, useEffect } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ThemeContext } from './ThemeProvider';

export default function ThemeSwitcher({ string }) {
    const { theme, handleThemeChange } = useContext(ThemeContext);

    const handleThemeSwitch = () => {
        const updatedTheme = theme === 'dark' ? 'light' : 'dark';
        handleThemeChange(updatedTheme);
    };

    useEffect(() => {
        const body = document.querySelector('body');
        body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div>
            {theme === 'light' ? (
                <div onClick={handleThemeSwitch}>
                    <DarkModeOutlinedIcon
                        className="text-black text-xl cursor-pointer"
                    />
                    <span className="ml-2">{ string }</span>
                </div>
            ) : (
                    <div onClick={handleThemeSwitch}>
                    <LightModeOutlinedIcon className="text-white text-xl cursor-pointer"
                    />
                    <span className="ml-2">{ string }</span>
                </div>
            )}
        </div>
    );
}
