import Button from "../shared/components/Button";
import LoginForm from "./components/LoginForm";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-6 py-32 px-8 bg-white">
                <div className="flex flex-col items-center gap-5 text-center">
                    <h1 className="font-title01 text-black dark:text-zinc-50">
                        카카오 인앱 브라우저 테스트
                    </h1>
                    <p className="font-body02 text-zinc-600 ">
                        폰트, 모션, 로그인 상태, 설정 저장 등 확인해주세요
                    </p>
                </div>

                <LoginForm />
            </main>
        </div>
    );
}
