import React, { useContext } from 'react';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { SendIcon } from './icons/SendIcon'
import { ThemeContext } from './ThemeProvider';

const MenuItem = ({ user, iconString }) => {

  const { theme, handleThemeChange } = useContext(ThemeContext);
  let icon = null;

  if (iconString === 'Home') { icon = HomeRoundedIcon };
  if (iconString === 'Search') {icon = SearchRoundedIcon};
  if (iconString === 'Explore') {icon = ExploreRoundedIcon};
  if (iconString === 'Messages') {icon = SendIcon};
  if (iconString === 'Notifications') {icon = FavoriteBorderRoundedIcon};
  if (iconString === 'Create') {icon = AddRoundedIcon};
  if (iconString === 'Profile') {icon = AccountCircleRoundedIcon};
  // if (iconString === 'Log out') {icon = MenuRoundedIcon};
  if (iconString === 'More') {icon = MenuRoundedIcon};

  return (
    <div className="w-full xl:inline-block xl:hover:bg-gray1 hover:bg-gray1 xl:dark:hover:bg-gray7 p-2 rounded-lg transition duration-300 ease-in-out cursor-pointer mb-2 xl:mb-4 bg-white dark:bg-gray9 text-gray9 dark:text-gray1">
      <div className="flex justify-center xl:justify-start items-center">
        {iconString === 'Profile' ? (
          <img
            className={`rounded-full ml-[2px] w-[30px] h-[30px] cursor-pointer ${iconString === 'Profile' ? 'mr-1' : ''}`}
            src={user.file}
          />
        ) : (
          React.createElement(icon, { fill: "#000", size: 40 })
        )}
        <span className="xl:block hidden bg-white dark:bg-gray9 hover:bg-gray1 dark:hover-bg-gray7 xl:dark:hover:bg-gray7 text-gray9 dark:text-gray1 dark:hover:text-gray3 font-extrabold text-[18px] pl-2 mt-0.5">
          {iconString}
        </span>
      </div>
    </div>
  );
};

export default MenuItem;