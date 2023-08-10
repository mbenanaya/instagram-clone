import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'

export default function ContentOverlay({ postByUser, onSelectedPost }) {
  const [isHover, setIsHover] = useState(false);

	const handleMouseEnter = () => {
		setIsHover(true)
	}

	const handleMouseLeave = () => {
		setIsHover(false)
	}

	const handleClick = () => {
		onSelectedPost(postByUser)
	}

	return (
		<Link href={route('post.index', { user: postByUser.user.id, id: postByUser.id })}>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				className="flex items-center justify-center cursor-pointer relative"
			>
				{isHover && (
					<div className="absolute w-full h-full z-50 flex items-center justify-around text-lg font-extrabold text-white bg-black bg-opacity-40">
						<div className="flex items-center justify-around w-[50%]">
							<div className="flex items-center justify-center">
								<AiFillHeart height="30px" width="30px" color="#FFFFFF" />
								<div className="pl-1">{postByUser.likes.length}</div>
							</div>
							<div className="flex items-center justify-center">
								<FaRegComment height="30px" width="30px" color="#FFFFFF" />
								<div className="pl-1">{postByUser.comments.length}</div>
							</div>
						</div>
					</div>
				)}

				<img
					className="aspect-square mx-auto z-0 object-cover cursor-pointer"
					src={postByUser.file}
				/>
			</div>
		</Link>
	)
}