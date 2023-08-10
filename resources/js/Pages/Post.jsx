import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { BsThreeDots } from 'react-icons/bs'

export default function Post({auth, post }) {
	console.log(post)
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Post" />
			<div className="w-[100%-80px] xl:w-[100%-280px] p-6 pt-12">
				<div className="flex border border-gray4 dark:border-gray3">
					<div className="h-full w-3/5 border border-r-gray4 dark:border-r-gray3">
						{/*<img src={post.file} alt="" className="w-full h-full" />*/}
						<img src='../../images/quran.jpeg' alt="" className="w-full h-full" />
					</div>
					<div className="h-full w-2/5">
						<div className="py-5 px-4 flex justify-between items-center border border-b-gray4 dark:border-b-gray3">
							<img src={post.user.file} alt="" className="rounded-full w-[38px] h-[38px]" />
							<div className="font-extrabold text-sm text-black dark:text-white text-[15px]">
			                 	{post.user.name}
			                </div>
			                <div className="text-blue-600 text-sm font-extrabold">
			                	<button>Follow</button>
			                </div>
			                <BsThreeDots className="ml-2 text-black dark:text-white" size={30} />
						</div>
						{post.comments &&
							post.comments.map((comment) => (
								<div
									key={comment.id}
									className="p-3"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<img
												className="rounded-full w-[38px] h-[38px]"
												src={comment.user.file}
												alt="Comment User Profile"
											/>
											<div className="ml-4 font-extrabold text-[15px]">
												{comment.user.name}
												<span className="ml-2 font-light text-gray-700 text-sm">{comment.created_at}</span>
											</div>
										</div>
										{user.id === comment.user.id && (
											<BsThreeDots
												className="cursor-pointer"
												onClick={() => setDeleteType('Comment', setId(comment.id))}
												size={27}
											/>
										)}
									</div>
									<div className="text-[13px] pl-[55px]">
										{comment.text}
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}