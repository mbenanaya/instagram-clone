import ApplicationLogo from './ApplicationLogo';
import ThemeSwitcher from './ThemeSwitcher';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

import { Link } from '@inertiajs/react';

export default function Navbar() {
  const { theme, handleThemeChange } = useContext(ThemeContext);
  return (
    <>
      <nav className='w-full fixed top-0 z-50 bg-gray2 dark:bg-gray8 drop-shadow-lg'>
        <div className="flex items-center justify-between mx-auto px-8 py-4">
          <span className="flex items-center w-[110px]">
            <Link href={route('login')} >
              <ApplicationLogo theme={theme} />
            </Link>
          </span>
          <span className="flex items-center">
            <ThemeSwitcher onThemeChange={handleThemeChange} />
          </span>
        </div>
      </nav>
    </>
  );
}
