import { useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

export default function CreatePostOverlay({ onClose, user }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        text: '',
        file: null,
    })
    const [fileDisplay, setFileDisplay] = useState('')
    const [isValidFile, setIsValidFile] = useState(null)
    const textareaRef = useRef(null)

    const createPostFunc = (e) => {
        e.preventDefault()
        post('/posts', data, {
            onSuccess: () => {
                closeOverlay()
                console.log('post data sent')
            },
            onError: (error) => {
                if (error.response.data.errors) {
                    const { file, text } = error.response.data.errors
                    setError({ file: file ? file[0] : '', text: text ? text[0] : '' })
                } else {
                    console.log(error.response.data.message)
                }
            },
        })
    }

    const getUploadedImage = (e) => {
        const file = e.target.files[0];
        let extension = file.name.split('.').pop()

        if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
            setIsValidFile(true)
            setFileDisplay(URL.createObjectURL(file))
            setData('file', file)
        } else {
            setIsValidFile(false)
            setFileDisplay('')
            setData('file', null)
            return
        }

        setTimeout(() => {
            textareaRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 300)
    }


    const closeOverlay = () => {
        setData({ text: '', file: null })
        setFileDisplay('');
        onClose();
    }

    return (
        <div
            id="OverlaySection"
            className="fixed z-50 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
        >
            <Head title="Create new post • Instagram" />
            <button
                className="absolute right-3 cursor-pointer"
                onClick={closeOverlay}
            >
                <CloseRoundedIcon size={27} fillcolor="#FFF" className="text-white" />
            </button>

            <div className="max-w-6xl h-[calc(100%-100px)] mx-auto mt-10 bg-white text-gray9 dark:bg-gray8 dark:text-gray1 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between w-full rounded-t-xl p-3 border-b border-b-gray-300">
                    <ArrowBackRoundedIcon
                        size={30}
                        fillcolor="#000000"
                        onClick={closeOverlay}
                        className="cursor-pointer"
                    />
                    <div className="text-lg font-extrabold">Create new post</div>
                    <button
                        onClick={createPostFunc}
                        className=" text-lg text-blue-500 hover:text-gray-900 font-extrabold"
                    >
                        Share
                    </button>
                </div>

                <div className="w-full md:flex h-[calc(100%-55px)] rounded-xl overflow-auto">
                    <div className="flex items-center bg-white text-gray9 dark:bg-gray8 dark:text-gray1 w-full h-full overflow-hidden">
                        {fileDisplay ? (
                            <img
                                className="min-w-[400px] p-4 mx-auto"
                                src={fileDisplay}
                                alt="Uploaded File"
                            />
                        ) : (
                            <div className="flex flex-col items-center mx-auto">
                                <label
                                    htmlFor="file"
                                    className="hover:bg-blue-700 bg-blue-500 rounded-lg p-2.5 text-white font-extrabold cursor-pointer"
                                >
                                    Select From Computer
                                </label>
                                <input
                                    id="file"
                                    className="hidden"
                                    type="file"
                                    onChange={getUploadedImage}
                                />
                                <InputError message={errors.file} className="mt-2 font-extrabold" />
                                {!fileDisplay && isValidFile === false && (
                                    <div className="text-red-500 text-center p-2 font-extrabold">
                                        File not accepted
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        id="TextAreaSection"
                        className="max-w-[720px] w-full relative bg-white text-gray9 dark:bg-gray8 dark:text-gray1"
                        ref={textareaRef}
                    >
                        <div className="flex items-center justify-between p-3">
                            <div className="flex items-center">
                                <img
                                    className="rounded-full w-[38px] h-[38px]"
                                    src={user.file}
                                    alt="User Profile"
                                />
                                <div className="ml-4 font-extrabold text-[15px]">
                                    {user.name}
                                </div>
                            </div>
                        </div>
                        <InputError message={errors.text} className="mt-2 ml-3 font-extrabold" />

                        <div className="flex w-full max-h-[200px] bg-white dark:bg-gray8">
                            <textarea
                                ref={textareaRef}
                                value={data.text}
                                onChange={(e) => setData('text', e.target.value)}
                                placeholder="Write caption..."
                                rows="10"
                                className="placeholder-gray-500 bg-white text-gray9 dark:bg-gray8 dark:text-gray1 w-full border-0 mt-2 mb-2 z-50 focus:ring-0 text-[18px]"
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between border-b p-3">
                            <div className="text-lg font-extrabold text-gray-500">
                                Add Location
                            </div>
                            <LocationOnRoundedIcon size={27} />
                        </div>

                        <div className="flex items-center justify-between border-b p-3">
                            <div className="text-lg font-extrabold text-gray-500">
                                Accesibility
                            </div>
                            <ExpandMoreRoundedIcon size={27} />
                        </div>

                        <div className="flex items-center justify-between border-b p-3">
                            <div className="text-lg font-extrabold text-gray-500">
                                Advanced Settings
                            </div>
                            <ExpandMoreRoundedIcon size={27} />
                        </div>

                        <div className="text-gray-500 mt-3 p-3 text-sm">
                            Your reel will be shared with your followers in their feeds and
                            can be seen on your profile. It may also appear in places such as
                            Reels, where anyone can see it.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
