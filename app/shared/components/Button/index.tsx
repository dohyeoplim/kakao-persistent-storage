import { ButtonProps } from "./types";

export default function Button({
    fill = false,
    children,
    className,
    ...props
}: ButtonProps) {
    const style = fill
        ? "card-designed font-body06 flex w-full items-center justify-center py-3.5 transition-colors hover:bg-[#383838] cursor-pointer"
        : "card-designed font-body06 flex w-full items-center justify-center py-3.5 transition-colors hover:bg-zinc-100 cursor-pointer";
    return (
        <button className={`${style} ${className}`} {...props}>
            {children}
        </button>
    );
}
