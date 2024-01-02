import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "rounded-full dark:bg-black dark:text-white w-full border border-gray3 dark:border-gray2 outline-0 focus:outline-none focus:border-gray2 shadow-none focus:ring-0 focus:outline dark:placeholder-white pt-3 h-12 oveflow-y-auto font-light pl-4" +
                className
            }
            ref={input}
        />
    );
});
