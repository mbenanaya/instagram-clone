import ApplicationLogo from '@/Components/ApplicationLogo'
import ShowPostOverlay from '@/Components/ShowPostOverlay'
import LikesSection from '@/Components/LikesSection'
import TopNav from '@/Components/TopNav'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import { BsThreeDots } from 'react-icons/bs'
import { Head, Link, usePage } from '@inertiajs/react'
// import { useInertia } from '@inertiajs/inertia-react'
import { useState, useEffect } from 'react'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowSize
}

export default function Dashboard({ auth, posts, allUsers }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentPost, setCurrentPost] = useState(null)
    const [openOverlay, setOpenOverlay] = useState(false)
    // const { width } = useWindowSize()
    const [wWidth, setWWidth] = useState(window.innerWidth);
    // const { post, delete: deleteRequest } = useInertia()

    useEffect(() => {
        function handleResize() {
            setCurrentSlide(0);
        }
        window.addEventListener('resize', handleResize)
        return () => {
        window.removeEventListener('resize', handleResize)
        }
    }, [])

    const addComment = (object) => {
    post('/comments', {
    post_id: object.post.id,
    user_id: object.user.id,
    comment: object.comment,
    }, {
    onFinish: () => updatedPost(object),
    })
    }

    const deleteFunc = (object) => {
    let url = ''
    if (object.deleteType === 'Post') {
    url = '/posts/' + object.id;
    } else {
    url = '/comments/' + object.id;
    }

    deleteRequest(url, {
    onFinish: () => updatedPost(object),
    });

    if (object.deleteType === 'Post') {
    setOpenOverlay(false);
    }
    };

    const updateLike = (object) => {
    let deleteLike = false;
    let id = null;

    for (let i = 0; i < object.post.likes.length; i++) {
    const like = object.post.likes[i];
    if (like.user_id === object.user.id && like.post_id === object.post.id) {
    deleteLike = true;
    id = like.id;
    }
    }

    if (deleteLike) {
    deleteRequest('/likes/' + id, {
    onFinish: () => updatedPost(object),
    });
    } else {
    post('/likes', {
    post_id: object.post.id,
    }, {
    onFinish: () => updatedPost(object),
    });
    }
    };

    const updatedPost = (object) => {
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            if (post.id === object.post.id) {
                setCurrentPost(post);
            }
        }
    }

    const handleSlideChange = (value) => {
    setCurrentSlide(value);
    };

    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Instagram" />
            <TopNav />
            <div className=" flex justify-center w-full lg:justify-between bg-white dark:bg-gray9">
                <div className="mx-auto w-full w-full lg:w-8/12 lg:pl-0 md:pl-[80px] pl-0 bg-white dark:bg-gray9 text-gray9 dark:text-gray1">
                    {/*<Carousel
                        selectedItem={currentSlide}
                        onChange={handleSlideChange}
                        className="max-w-[700px] mx-auto"
                        itemsToShow={wWidth >= 768 ? 8 : 6}
                        itemsToScroll={4}
                        showArrows={true}
                        showThumbs={false}
                        transitionTime={500}
                        snapAlign="start"
                    >
                        {allUsers.map((slide) => (
                            <div key={slide.id} className="relative mx-auto text-center mt-4 px-2 cursor-pointer">
                            <div className="absolute z-[-1] -top-[5px] left-[4px] rounded-full rotate-45 w-[64px] h-[64px] contrast-[1.3] bg-gradient-to-t from-yellow-300 to-purple-500 via-red-500">
                                <div className="rounded-full ml-[3px] mt-[3px] w-[58px] h-[58px] bg-white" />
                                </div>
                                <img
                                    className="rounded-full w-[56px] h-[56px] -mt-[1px]"
                                    src={slide.file} alt={slide.name}
                                />
                                <div className="text-xs mt-2 w-[60px] truncate text-ellipsis overflow-hidden">
                                    {slide.name}
                                </div>
                            </div>
                        ))}
                    </Carousel>*/}
                    {posts.data.map((post) => (
                        <div key={post.id} className="px-4 bg-white dark:bg-gray9 max-w-[600px] mx-auto mt-10">
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <Link href={route('user.show', { id: post.user.id })} className="flex items-center">
                                        <img
                                            className="rounded-full w-[38px] h-[38px]"
                                            src={post.user.file}
                                            alt={post.user.name}
                                        />
                                        <div className="ml-4 font-extrabold text-[15px]">{post.user.name}</div>
                                    </Link>
                                    <div className="flex items-center text-[15px] text-gray-500">
                                        <span className="-mt-5 ml-2 mr-[5px] text-[35px]">.</span>
                                        <div>{post.created_at}</div>
                                    </div>
                                </div>

                                <BsThreeDots className="cursor-pointer" size={27} />
                            </div>

                            <div className="bg-black rounded-lg w-full min-h-[400px] flex items-center">
                                <img className="mx-auto w-full" src={post.file} alt="Post" />
                            </div>

                            <LikesSection post={post} user={auth.user} onLike={updateLike} />

                            <div className="text-black dark:text-white font-extrabold py-1">{post.likes.length} likes</div>
                            <div>
                                <span className="text-black dark:text-white font-extrabold mr-4">
                                    {post.user.name}
                                </span>
                                {post.text}
                            </div>
                            <button
                                onClick={() => {
                                    setCurrentPost(post);
                                    setOpenOverlay(true);
                                }}
                                className="text-gray-500 font-extrabold py-1"
                            >
                                View all {post.comments.length} comments
                            </button>
                        </div>
                    ))}
                    
                    {openOverlay && (
                        <ShowPostOverlay
                            user={auth.user}
                            post={currentPost}
                            onAddComment={addComment}
                            onUpdateLike={updateLike}
                            onDeleteSelected={deleteFunc}
                            onCloseOverlay={() => setOpenOverlay(false)}
                        />
                    )}
                    
                </div>
                <div
                    id="SuggestionsSection"
                    className="lg:w-4/12 lg:block hidden text-black mt-10"
                >
                    <Link
                        href={route('profile.index')}
                        className="flex items-center justify-between max-w-[300px]"
                    >
                        <div className="flex items-center">
                            <img
                                className="rounded-full z-10 w-[58px] h-[58px]"
                                src={auth.user.file}
                            />
                            <div className="pl-4">
                                <div className="text-black  dark:text-white font-extrabold">
                                    {auth.user.name}
                                </div>
                                <div className="text-gray5  dark:text-gray4 text-extrabold text-sm">
                                    {auth.user.name}
                                </div>
                            </div>
                        </div>
                        <button className="text-blue-500 hover:text-gray-900 text-xs font-extrabold">
                            Switch
                        </button>
                    </Link>

                    <div className="max-w-[300px] flex items-center justify-between py-3">
                        <div className="text-gray5 font-extrabold">
                            Suggestions for you
                        </div>
                        <button className="text-blue-500 hover:text-gray-900 text-xs font-extrabold">
                            See All
                        </button>
                    </div>
                    <TopNav />
                    {allUsers.map((randUser) => (
                        <Link
                            key={randUser.id}
                            href={route('user.show', { id: randUser.id })}
                            className="flex items-center justify-between max-w-[300px] pb-2"
                        >
                            <div className="flex items-center">
                                <img
                                    className="rounded-full z-10 w-[37px] h-[37px]"
                                    src={randUser.file}
                                />
                                <div className="pl-4">
                                    <div className="text-black dark:text-white font-extrabold">
                                        {randUser.name}
                                    </div>
                                    <div className="text-gray5  dark:text-gray4 text-extrabold text-sm">
                                        Suggested for you
                                    </div>
                                </div>
                            </div>
                            <button className="text-blue-500 hover:text-gray9 text-xs font-extrabold">
                                Follow
                            </button>
                        </Link>
                    ))}

                    <div className="max-w-[300px] mt-5">
                        <div className="text-sm text-gray-400">
                            About Help Press API Jobs Privacy Terms Locations Language Meta
                            Verified
                        </div>
                        <div className="text-left text-gray-400 mt-4">
                            © 2023 INSTAGRAM FROM META
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
