import { useState, useEffect, useRef } from "react";
// import { usePage } from '@inertiajs/inertia-react';

import ShowPostOptionsOverlay from "./ShowPostOptionsOverlay";
import LikesSection from "./LikesSection";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { BsThreeDots } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";

export default function ShowPostOverlay({ user, post, onCloseOverlay }) {
    const [comment, setComment] = useState("");
    const [deleteType, setDeleteType] = useState(null);
    const [id, setId] = useState(null);
    const textareaRef = useRef(null);

    const textareaInput = (e) => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }, [comment]);

    const addComment = () => {
        const commentData = {
            post_id: post.id,
            user_id: user.id,
            comment: comment,
        };
        // Emit 'addComment' event passing commentData
        // $emit('addComment', commentData);
        setComment("");
    };

    const deleteSelected = () => {
        // Emit 'deleteSelected' event passing deleteType and id
        // $emit('deleteSelected', { deleteType, id });
        setDeleteType(null);
        setId(null);
    };

    const closeOverlay = () => {
        setDeleteType(null);
        setId(null);
        // Emit 'closeOverlay' event
        // $emit('closeOverlay');
    };

    return (
        <div
            id="OverlaySection"
            className="fixed z-50 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
        >
            <button className="absolute right-3" onClick={closeOverlay}>
                <CloseRoundedIcon size={27} fillcolor="#FFFFFF" />
            </button>
            <div className="max-w-6xl h-[calc(100%-100px)] mx-auto mt-10 bg-white rounded-xl">
                <div className="w-full md:flex h-full overflow-auto rounded-xl">
                    <div className="flex items-center bg-black w-full">
                        <img
                            className="rounded-xl min-w-[400px] p-4 mx-auto"
                            src={post.file}
                            alt="Post Image"
                        />
                    </div>
                    <div className="md:max-w-[500px] w-full relative bg-white dark:bg-black text-black dark:text-white">
                        <div className="flex items-center justify-between p-3 border-b border-b-gray5">
                            <div className="flex items-center">
                                <img
                                    className="rounded-full w-[38px] h-[38px]"
                                    src={post.user.file}
                                    alt="User Profile"
                                />
                                <div className="ml-4 font-extrabold text-black dark:text-white text-[15px]">
                                    {post.user.name}
                                </div>
                                <div className="flex items-center text-[15px] text-gray-500">
                                    <span className="-mt-5 ml-2 mr-[5px] text-[35px]">
                                        .
                                    </span>
                                    <div>{post.created_at}</div>
                                </div>
                            </div>
                            {user.id === post.user.id && (
                                <button
                                    onClick={() =>
                                        setDeleteType("Post", setId(post.id))
                                    }
                                >
                                    <BsThreeDots
                                        className="cursor-pointer"
                                        size={27}
                                    />
                                </button>
                            )}
                        </div>
                        <div className="overflow-y-auto h-[calc(100%-170px)]">
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center relative">
                                    <img
                                        className="absolute -top-1 rounded-full w-[38px] h-[38px]"
                                        src={post.user.file}
                                        alt="User Profile"
                                    />
                                    <div className="ml-14">
                                        <span className="font-extrabold text-black dark:text-white text-[15px] mr-2">
                                            {post.user.name}
                                        </span>
                                        <span className="text-[15px] text-gray9 dark:text-white">
                                            {post.text}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {post.comments &&
                                post.comments.map((comment) => (
                                    <div key={comment.id} className="p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    className="rounded-full w-[38px] h-[38px]"
                                                    src={comment.user.file}
                                                    alt="Comment User Profile"
                                                />
                                                <div className="ml-4 font-extrabold text-[15px]">
                                                    {comment.user.name}
                                                    <span className="ml-2 font-light text-gray-700 text-sm">
                                                        {comment.created_at}
                                                    </span>
                                                </div>
                                            </div>
                                            {user.id === comment.user.id && (
                                                <BsThreeDots
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        setDeleteType(
                                                            "Comment",
                                                            setId(comment.id)
                                                        )
                                                    }
                                                    size={27}
                                                />
                                            )}
                                        </div>
                                        <div className="text-[13px] pl-[55px]">
                                            {comment.text}
                                        </div>
                                    </div>
                                ))}
                            <div className="pb-16 md:hidden"></div>
                        </div>
                        <LikesSection post={post} />
                        <div className="absolute flex border border-gray5 bottom-0 w-full max-h-[200px] bg-white dark:bg-black text-black dark:text-white overflow-auto">
                            <BsEmojiSmile
                                className="ml-2 mt-[10px] text-black dark:text-white"
                                size={30}
                            />
                            <textarea
                                ref={textareaRef}
                                onInput={textareaInput}
                                value={comment}
                                placeholder="Add a comment..."
                                rows="1"
                                className="w-full border-0 mt-2 mb-2 text-sm z-50 focus:ring-0 text-gray6 dark:text-white bg-white dark:bg-black text-[18px]"
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            {comment && (
                                <button
                                    className="text-blue-600 font-extrabold pr-4"
                                    onClick={addComment}
                                >
                                    Post
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {deleteType && (
                <ShowPostOptionsOverlay
                    deleteType={deleteType}
                    id={id}
                    deleteSelected={deleteSelected}
                    close={closeOverlay}
                />
            )}
        </div>
    );
}
