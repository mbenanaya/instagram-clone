import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TopNavUser from '@/Components/TopNavUser'
import CreatePostOverlay from '@/Components/CreatePostOverlay'
import ContentOverlay from '@/Components/ContentOverlay'
import { PostsIcon } from '@/Components/icons/PostsIcon'
import { ReelsIcon } from '@/Components/icons/ReelsIcon'
import { AccountIcon } from '@/Components/icons/AccountIcon'
import { IoMdSettings } from 'react-icons/io'
import { IoMdBookmark } from 'react-icons/io'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md'
import { BiLinkAlt } from 'react-icons/bi'
import { PiCamera } from 'react-icons/pi'

export default function Index({ auth, postsByUser }) {

	const [showCreatePost, setShowCreatePost] = useState(false)

	const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        file: null,
    });

	const getUploadedImage = (e) => {
	    e.preventDefault()
	    const file = e.target.files[0]
	    setData('file', file)
        post('/profile',data, {
	        onSuccess: () => {
	            console.log('image updated')
	        },
	        onError: (error) => {
	            if (error.response.data.errors) {
	                console.log(error.response.data.message)
	            }
	        },
	    })
	}

	return (
		<AuthenticatedLayout user={auth.user} >
			<Head title="Profile" />

			<div className="xl:w-[100% - 280px] w-[100% - 80px] h-full pb-12 md:py-12 bg-white dark:bg-gray9 text-gray9 dark:text-gray1">
				<TopNavUser user={auth.user} />

				<div className="pt-2 md:pt-6"></div>
				<div className="mt-24 md:mt-0 lg:ml-0 md:ml-[80px] pl-4 md:pl-20 px-4 w-full">
					<div className="flex items-center md:justify-between space-x-12">
						<label htmlFor="fileUser">
							<img
								className="rounded-full object-fit md:w-[200px] w-[100px] cursor-pointer"
								src={auth.user.file} 
							/>
						</label>

						{auth.user.id === auth.user.id && (
							<input
								id="fileUser"
								type="file"
								className="hidden"
								onChange={(e) => getUploadedImage(e)} 
							/>
						)}

						<div className="ml-6 w-full">
							<div className="flex items-center md:mb-6 mb-5 space-x-8 md:space-x-6">
								<div className="md:mr-6 mr-3 rounded-lg text-[22px]">{auth.user.username}</div>
								<Link href={route('profile.edit')}>
									<button className="md:block hidden py-2 px-4 rounded-lg text-[16px] font-extrabold bg-gray-100 hover:bg-gray-200 dark:text-gray9">
										Edit Profile  
									</button>
								</Link>
								<Link href={route('profile.edit')}>
									<IoMdSettings size={28} className="cursor-pointer"/>
								</Link>
							</div>

							<button className="md:hidden mr-6 p-1 px-4 max-w-[260px] w-full rounded-lg text-[17px] font-extrabold bg-gray-100 hover:bg-gray-200">
								Edit Profile
							</button>

							<div className="md:block hidden">
								<div className="flex items-center text-[18px]">
									<div className="mr-6">
										<span className="font-extrabold mr-1">
											{postsByUser.data.length}
										</span>
										posts 
									</div>
									<div className="mr-6">
										<span className="font-extrabold">123</span> followers
									</div>
									<div className="mr-6">
										<span className="font-extrabold">456</span> following
									</div>
								</div>
								<div className="hidden md:block">
									<div className="mt-6 font-extrabold">
										{ auth.user.name }
									</div>
								</div>
								{auth.user.bio && (
									<div className="hidden md:block">
										<div className="mt-1">
											{ auth.user.bio }
										</div>
									</div>
								)}

								{auth.user.website && (
									<div className="hidden md:block">
										<div className="mt-1 flex justify-start items-center">
											<span className="mr-2"> <BiLinkAlt /> </span>
											<a href={auth.user.website} target="_blank" className="font-semibold text-blue-500">
												{auth.user.website}
											</a>
										</div>
									</div>
								)}
								
							</div>
						</div>
					</div>
					<div className="flex md:hidden justify-start">
						<div className="mt-6 font-extrabold">
							{ auth.user.name }
						</div>
					</div>

					{auth.user.bio && (
						<div className="flex md:hidden justify-start">
							<div className="mt-1">
								{auth.user.bio}
							</div>
						</div>
					)}

					{auth.user.website && (
						<div className="mt-1 flex justify-start items-center md:hidden">
							<span className="mr-2"> <BiLinkAlt /> </span>
							<a href={auth.user.website} className="font-semibold text-blue-500">
								{auth.user.website}
							</a>
						</div>
					)}
					
				</div>
				<div className="md:hidden">
					<div className="w-full flex items-center justify-around border-t border-t-gray-300 mt-8">
						<div className="text-center p-3">
							<div className="font-extrabold">{postsByUser.data.length}</div>
							<div className="text-gray-400 font-semibold -mt-1.5">posts</div>
						</div>
						<div className="text-center p-3">
							<div className="font-extrabold">43</div>
							<div className="text-gray-400 font-semibold -mt-1.5">followers</div>
						</div>
						<div className="text-center p-3">
							<div className="font-extrabold">55</div>
							<div className="text-gray-400 font-semibold -mt-1.5">following</div>
						</div>
					</div>

					<div className="w-full flex items-center justify-center">
						<div className="w-full flex items-start justify-between  border-t border-t-gray-300">
							<div className="p-3 pt-0 pl-0 w-1/3 flex justify-center items-center ">
								<button
									type="button"
									className="w-full hs-tab-active:font-bold hs-tab-active:border-gray9 dark:hs-tab-active:border-gray1 hs-tab-active:text-purple-500 p-[17px] w-1/4 flex justify-center items-center py-4 px-1 inline-flex items-center gap-2 border-t-[2px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:text-purple-500 active"
										id="p-tab"
										data-hs-tab="#ps"
										aria-controls="ps"
										role="tab"
								>
									<PostsIcon color="rgb(0, 149, 246)" height="28px" width="28px" className="cursor-pointer" />
								</button>
							</div>
							<div className="p-3 pt-0 w-1/3 flex justify-center items-center ">
								<button
									type="button"
									className="w-full hs-tab-active:font-bold hs-tab-active:border-gray9 dark:hs-tab-active:border-gray1 hs-tab-active:text-purple-500 p-[17px] w-1/4 flex justify-center items-center py-4 px-1 inline-flex items-center gap-2 border-t-[2px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:text-purple-500"
									id="rls-tab"
									data-hs-tab="#rls"
									aria-controls="rls"
									role="tab"
								>
									<ReelsIcon Color="rgb(115, 115, 115)" height="28px" width="28px" className="cursor-pointer" />
								</button>
							</div>

							<div className="p-3 pt-0 pr-0 w-1/3 flex justify-center items-center ">
								<button
									type="button"
									className="w-full hs-tab-active:font-bold hs-tab-active:border-gray9 dark:hs-tab-active:border-gray1 hs-tab-active:text-purple-500 p-[17px] w-1/4 flex justify-center items-center py-4 px-1 inline-flex items-center gap-2 border-t-[2px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:text-purple-500"
									id="tgd-tab"
									data-hs-tab="#tgd"
									aria-controls="tgd"
									role="tab"
								>
									<AccountIcon Color="rgb(115, 115, 115)" height="28px" width="28px" className="cursor-pointer" />
								</button>
							</div>

						</div>
					</div>

					<div className="mt-3 md:hidden">
						<div id="ps" role="tabpanel" aria-labelledby="p-tab">
							<div className="grid md:gap-4 gap-1 grid-cols-3 relative">
								{postsByUser.data.map((postByUser) => (
								<div key={postByUser.id}>
									<ContentOverlay
										postByUser={postByUser}
										onSelectedPost={(data) => console.log(data)}
									/>
								</div>
								))}
							</div>
						</div>

						<div id="rls" className="hidden" role="tabpanel" aria-labelledby="rls-tab">
							<div className="grid md:gap-4 gap-1 grid-cols-3 relative">
								{postsByUser.data.map((postByUser) => (
								<div key={postByUser.id}>
									<ContentOverlay
										postByUser={postByUser}
										onSelectedPost={(data) => console.log(data)}
									/>
								</div>
								))}
							</div>
						</div>

						<div id="saved" className="hidden" role="tabpanel" aria-labelledby="saved-tab">
							SAVED
						</div>

						<div id="tgd" className="hidden" role="tabpanel" aria-labelledby="tgd-tab">
							TAGGED
						</div>
					</div>
				</div>

				<div className="pb-12 bg-white dark:bg-gray9 text-gray9 dark:text-gray1 md:pr-1.5 md:pl-[90px] lg:px-6 xl:px-8">
					<div className="md:block mt-10 hidden border-t border-t-gray-300">
						<div className="flex items-center justify-between max-w-[600px] mx-auto font-extrabold text-gray-400 text-[15px]">
							<button
								type="button"
								className="hs-tab-active:font-bold hs-tab-active:border-gray9 dark:hs-tab-active:border-gray1 hs-tab-active:text-purple-500 p-[17px] w-1/4 flex justify-center items-center py-4 px-1 inline-flex items-center gap-2 border-t-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:text-purple-500 active"
									id="posts-tab"
									data-hs-tab="#posts"
									aria-controls="posts"
									role="tab"
							>
								<PostsIcon color="#8E8E8E" size="18px" className="cursor-pointer" />
								<span className="ml-2 -mb-[1px]">POSTS</span>
							</button>
							<button
								type="button"
								className="hs-tab-active:font-bold hs-tab-active:border-gray9 dark:hs-tab-active:border-gray1 hs-tab-active:text-purple-500 p-[17px] w-1/4 flex justify-center items-center py-4 px-1 inline-flex items-center gap-2 border-t-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:text-purple-500"
								id="reels-tab"
								data-hs-tab="#reels"
								aria-controls="reels"
								role="tab"
							>
								<ReelsIcon Color="rgb(115, 115, 115)" size="18px" className="cursor-pointer" />
								<span className="ml-2 -mb-[1px]">REELS</span>
							</button>
							<button
								type="button"
								className="hs-tab-active:font-bold hs-tab-active:border-gray9 dark:hs-tab-active:border-gray1 hs-tab-active:text-purple-500 p-[17px] w-1/4 flex justify-center items-center py-4 px-1 inline-flex items-center gap-2 border-t-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:text-purple-500"
								id="saved-tab"
								data-hs-tab="#saved"
								aria-controls="saved"
								role="tab"
							>
								<IoMdBookmark size="18px" color="#8E8E8E" className="cursor-pointer" />
								<span className="ml-2 -mb-[1px]">SAVED</span>
							</button>
							<button
								type="button"
								className="hs-tab-active:font-bold hs-tab-active:border-gray9 dark:hs-tab-active:border-gray1 hs-tab-active:text-purple-500 p-[17px] w-1/4 flex justify-center items-center py-4 px-1 inline-flex items-center gap-2 border-t-[3px] border-transparent text-sm whitespace-nowrap text-black dark:text-white hover:text-purple-500"
								id="tagged-tab"
								data-hs-tab="#tagged"
								aria-controls="tagged"
								role="tab"
							>
								<AccountIcon Color="rgb(115, 115, 115)" size="18px" className="cursor-pointer" />
								<span className="ml-2 -mb-[1px]">TAGGED</span>
							</button>
							
						</div>
					</div>

					<div className="mt-3 hidden md:block">
						<div id="posts" role="tabpanel" aria-labelledby="posts-tab">
							{postsByUser.data.length === 0 ? (
	                            <div className="flex flex-col justify-center items-center pt-8">
	                                <span className="flex justify-center items-center w-[60px] h-[60px] rounded-full border-black dark:border-white border-2">
                                        <PiCamera size="36" />
                                    </span>
	                                <h1 className="text-3xl font-extrabold my-4">Share Photos</h1>
	                                <p className="text-md mb-4">When you share photos, they will appear on your profile.</p>
	                                <button
	                                	className="font-bold text-blue-500"
	                                	onClick={() => {
				                            setShowCreatePost(true);
				                        }}
	                                >
	                                	Share your first photo 
	                                </button>
	                                
	                                {showCreatePost && (
					                    <CreatePostOverlay onClose={() => setShowCreatePost(false)} user={auth.user} />
					                )}

	                            </div>
		                    ) : (
		                        <div className="grid md:gap-4 gap-1 grid-cols-3 relative">
		                           {postsByUser.data.map((postByUser) => (
										<div key={postByUser.id}>
											<ContentOverlay
												postByUser={postByUser}
												onSelectedPost={(data) => console.log(data)}
											/>
										</div>
									))}
		                        </div>
		                    )}
						</div>

						<div id="reels" className="hidden" role="tabpanel" aria-labelledby="reels-tab">
							{postsByUser.data.length === 0 ? (
	                            <div className="flex flex-col justify-center items-center pt-8">
	                                <span className="flex justify-center items-center w-[60px] h-[60px] rounded-full border-black dark:border-white border-2">
                                        <PiCamera size="36" />
                                    </span>
	                                <h1 className="text-3xl font-extrabold my-4">Share Photos</h1>
	                                <p className="text-md mb-4">When you share photos, they will appear on your profile.</p>
	                                <p className="font-bold text-blue-500 cursor-pointer">Share your first photo</p>
	                            </div>
		                    ) : (
		                        <div className="grid md:gap-4 gap-1 grid-cols-3 relative">
		                           {postsByUser.data.map((postByUser) => (
										<div key={postByUser.id}>
											<ContentOverlay
												postByUser={postByUser}
												onSelectedPost={(data) => console.log(data)}
											/>
										</div>
									))}
		                        </div>
		                    )}
						</div>

						<div id="saved" className="hidden" role="tabpanel" aria-labelledby="saved-tab">
							{postsByUser.data.length === 0 ? (
	                            <div className="flex flex-col justify-center items-center pt-8">
	                                <span className="flex justify-center items-center w-[60px] h-[60px] rounded-full border-black dark:border-white border-2">
                                        <PiCamera size="36" />
                                    </span>
	                                <h1 className="text-3xl font-extrabold my-4">Share Photos</h1>
	                                <p className="text-md mb-4">When you share photos, they will appear on your profile.</p>
	                                <p className="font-bold text-blue-500 cursor-pointer">Share your first photo</p>
	                            </div>
		                    ) : (
		                        <div className="grid md:gap-4 gap-1 grid-cols-3 relative">
		                           {postsByUser.data.map((postByUser) => (
										<div key={postByUser.id}>
											<ContentOverlay
												postByUser={postByUser}
												onSelectedPost={(data) => console.log(data)}
											/>
										</div>
									))}
		                        </div>
		                    )}
						</div>

						<div id="tagged" className="hidden" role="tabpanel" aria-labelledby="tagged-tab">
							<div className="flex flex-col justify-center items-center pt-8">
								<span className="flex justify-center items-center w-[60px] h-[60px] rounded-full border-black dark:border-white border-2">
                                        <PiCamera size="36" />
                                    </span>
								<h1 className="text-3xl font-extrabold my-4">Share Photos</h1>
								<p className="text-md mb-4">When you share photos, they will appear on your profile.</p>
								<p className="font-bold text-blue-500 cursor-pointer">Share your first photo</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}