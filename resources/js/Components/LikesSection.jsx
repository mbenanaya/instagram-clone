import { computed } from 'react';
// import { usePage } from '@inertiajs/inertia-react';

import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IoMdBookmark } from 'react-icons/io'

export default function LikesSection({ auth, post }) {
  // const user = usePage().props.auth.user;

  // const isHeartActiveComputed = computed(() => {
  //   let isTrue = false;

  //   for (let i = 0; i < post.likes.length; i++) {
  //     const like = post.likes[i];
  //     if (like.user_id === user.id && like.post_id === post.id) {
  //       isTrue = true;
  //     }
  //   }

  //   return isTrue;
  // });
  const isHeartActiveComputed = false

  return (
    <div className="flex z-20 items-center justify-between">
      <div className="flex items-center">
        <button onClick={() => emit('like', { post, user })} className="">
          {!isHeartActiveComputed ? (
            <AiOutlineHeart className="ml-4 my-[10px] cursor-pointer" size={30} />
          ) : (
            <AiFillHeart className="ml-4 my-[10px] cursor-pointer" fillcolor="#FF0000" size={30} />
          )}
        </button>
        <FaRegComment className="ml-4 my-[10px]" size={30} />
        <SendRoundedIcon className="ml-4 my-[10px] cursor-pointer" size={30} />
      </div>

      <IoMdBookmark className="ml-3 my-[10px] cursor-pointer" size={30} />
    </div>
  );
};
