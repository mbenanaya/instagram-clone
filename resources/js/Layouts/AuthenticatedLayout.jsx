import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from '@inertiajs/react'
import { Dropdown } from 'flowbite-react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import MenuItem from '@/Components/MenuItem'
import CreatePostOverlay from '@/Components/CreatePostOverlay'
import ThemeSwitcher from '@/Components/ThemeSwitcher'
import { ThemeContext } from '@/Components/ThemeProvider'
import { SmallLogoDark } from '@/Components/icons/SmallLogoDark'
import { SmallLogoLight } from '@/Components/icons/SmallLogoLight'
import { LogoDark } from '@/Components/icons/LogoDark'
import { LogoLight } from '@/Components/icons/LogoLight'
import { SendIcon } from '@/Components/icons/SendIcon'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { IoMdSettings, IoMdBookmark } from 'react-icons/io'


export default function Authenticated({ user, children }) {
    
    const { theme, handleThemeChange } = useContext(ThemeContext)
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

    const toggleMenu = () => {
        setShowMenu(prev => !prev)
    }

    const menuClasses = `w-full h-full mt-2 py-2 w-48 bg-white dark:bg-gray9 text-gray9 dark:text-gray1 rounded-md shadow-xl z-10 ${
        showMenu ? '' : 'hidden'
    }`;

    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
        }
    }, [menuRef]);

    return (
        <div className="flex xl:space-x-36 h-screen bg-white dark:bg-gray9 selection:bg-purple-500 selection:text-white">

            <div
                id="SideNav"
                className="fixed h-full bg-white dark:bg-gray9 text-gray9 dark:text-gray1 w-[80px] xl:w-[240px] md:block hidden border-r border-r-gray3"
            >
                <Link href="/dashboard">
                    {theme === 'light' ? (
                        <>
                            <div className="block xl:hidden w-[25px] mt-10 ml-[28px] mb-10">
                                <SmallLogoLight className="cursor-pointer" />
                            </div>
                            <div className="hidden xl:block w-[25px] mt-10 ml-[28px] mb-10">
                                <LogoLight className="cursor-pointer" />
                            </div>
                        </>
                    ) : (
                        <>
                            
                            <div className="block xl:hidden w-[25px] mt-10 ml-[28px] mb-10">
                                <SmallLogoDark className="cursor-pointer" />
                            </div>
                            <div className="hidden xl:block w-[25px] mt-10 ml-[28px] mb-10">
                                <LogoDark className="cursor-pointer" />
                            </div>
                        </>
                    )
                    }
                </Link>

                <div className="px-3 flex flex-col justify-center bg-white dark:bg-gray9 text-gray9 dark:text-gray1">
                    <Link href="/dashboard">
                        <MenuItem user={user} iconString="Home" className="mb-4" />
                    </Link>
                    <MenuItem user={user} iconString="Search" className="mb-4" />
                    <MenuItem user={user} iconString="Explore" className="mb-4" />
                    <Link href="/messages">
                        <MenuItem user={user} iconString="Messages" className="mb-4" />
                    </Link>
                    <MenuItem user={user} iconString="Notifications" className="mb-4" />
                    <button
                        onClick={() => {
                            setShowCreatePost(true);
                        }}
                    >
                    <MenuItem
                        iconString="Create"
                        className="mb-4"
                    />
                    </button>
                    <Link
                        href={route('profile.index')}
                    >
                        <MenuItem user={user} iconString="Profile" className="mb-4" />
                    </Link>

                    <button onClick={toggleMenu} className="mt-0 mb-6 md:mt-6 lg:mt-2 xl:mt-16">
                        <MenuItem iconString="More" className="mb-4" />
                    </button>

                </div>

                {showMenu && (
                    <ul
                        ref={menuRef}
                        className={`absolute bottom-[140px] left-[65px] xl:bottom-[70px] xl:left-[20px] py-2 mt-2 w-56 z-50 bg-white dark:bg-gray8 text-gray9 dark:text-gray1 rounded-md shadow-xl z-10 ${
                        showMenu ? '' : 'hidden'
                        }`}
                    >
                        <li className="flex items-center p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm cursor-pointer">
                            <span className="mr-2"><IoMdSettings /></span>
                            Settings
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm cursor-pointer">
                            <span className="mr-2"><IoMdBookmark /></span>
                            Saved
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm cursor-pointer">
                            <span className="mr-2"><ThemeSwitcher onThemeChange={handleThemeChange} /></span>
                            Switch appearance
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray2 dark:hover:bg-gray7 rounded-sm cursor-pointer">
                            <span className="mr-2"><HomeRoundedIcon /></span>
                            <Link href={route('logout')} method="post" as="button">Log out</Link>
                        </li>
                    </ul>
                )}
                {showCreatePost && (
                    <CreatePostOverlay onClose={() => setShowCreatePost(false)} user={user} />
                )}
            </div>

            <div className="grow bg-white dark:bg-gray9 text-gray9 dark:text-gray1">
                <main className="h-full md:pl-[80px] xl:pl-[96px]">
                    {children}
                </main>
            </div>

          <div
            id="BottomNav"
            className="fixed z-30 bottom-0 w-full md:hidden flex items-center justify-around bg-white dark:bg-gray9 text-gray9 dark:text-gray1 border-t py-2 border-t-gray3 dark:border-t-gray5"
          >
            <Link href="/dashboard">
              <HomeRoundedIcon
                fill="#000000"
                size={40}
                className="cursor-pointer"
              />
            </Link>
            <ExploreRoundedIcon
              fill="#000000"
              size={40}
              className="cursor-pointer"
            />
            <AccountCircleRoundedIcon
              fill="#000000"
              size={40}
              className="cursor-pointer"
            />
            <AddRoundedIcon
                onClick={() => {
                    setShowCreatePost(true);
                }}
                fill="#000000"
                size={40}
                className="cursor-pointer"
            />
            <SendRoundedIcon
              fill="#000000"
              size={40}
              className="cursor-pointer"
            />
            <Link
              href={route('profile.index')}
            >
              <img
                className="rounded-full w-[30px] cursor-pointer"
                src={user.file}
              />
            </Link>
          </div>

          {showCreatePost && (
            <CreatePostOverlay onClose={() => setShowCreatePost(false)} user={user} />
          )}
        </div>
    );
}
