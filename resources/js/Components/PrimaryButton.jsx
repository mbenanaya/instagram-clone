export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `bg-[#0095F6] hover:bg-[#2150fa] w-full rounded-lg p-1.5 text-white text-lg font-extrabold ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
