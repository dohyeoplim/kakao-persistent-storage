import { ButtonProps } from "./types";

export default function Button({
    fill = false,
    children,
    ...props
}: ButtonProps) {
    const style = fill
        ? "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-[158px] cursor-pointer"
        : "flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 md:w-[158px] cursor-pointer";
    return (
        <button className={style} {...props}>
            {children}
        </button>
    );
}
