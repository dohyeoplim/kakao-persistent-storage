import Image from "next/image";
import Button from "./components/Button";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-6 py-32 px-8 bg-white">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        카카오 인앱 브라우저 테스트
                    </h1>
                    <p className="text-lg leading-8 text-zinc-700 ">
                        폰트, 모션, 로그인 상태, 설정 저장 여부 등 확인해주세요
                    </p>
                </div>
                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <Button>로그인하기</Button>
                </div>
            </main>
        </div>
    );
}
