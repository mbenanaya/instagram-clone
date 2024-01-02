import { useForm } from "@inertiajs/react";
import { useState } from "react"
import { RiSendPlaneFill } from "react-icons/ri";
// import TextArea from "../TextArea";

export default function ChatInput({ receiver, scrollToBottom }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    });

    const [SendButton, setSendButton] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        post(route("chat.store", receiver.id))
        reset("message")
        scrollToBottom()
    };

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const showSendButton = (e) => {
        const messageLength = e.target.value.length
        if (messageLength > 0) {
            setSendButton(true)
        } else {
            setSendButton(false)
        }
    }

    return (
        <div className="w-full px-4 mb-12">
            <div className="mx-auto">
                <form onSubmit={submit}>
                    <input
                        className="relative rounded-full dark:bg-black dark:text-white w-full border border-gray3 dark:border-gray2 outline-0 focus:outline-none focus:border-gray2 shadow-none focus:ring-0 focus:outline dark:placeholder-white pt-3 h-12 oveflow-y-auto font-light pl-4"
                        placeholder="Message..."
                        name="message"
                        value={data.message}
                        onChange={onHandleChange}
                        onKeyUp={showSendButton}
                    ></input>
                    {SendButton && (
                        <button
                            type="submit"
                            className="absolute right-9 top-[86%] text-sm text-blue-500 font-semibold"
                        >
                            <RiSendPlaneFill className="text-blue-500" size={25} />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
