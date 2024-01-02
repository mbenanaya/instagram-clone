import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    const handleThemeChange = (updatedTheme) => {
        setTheme(updatedTheme);
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const body = document.querySelector('body');
        body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default React.memo(ThemeProvider);
