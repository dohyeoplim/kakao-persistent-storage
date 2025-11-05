import { getSession, logout } from "@/lib/session";
import LoginForm from "./components/LoginForm";
import Button from "@/shared/components/Button";
import ExpandableCard from "@/shared/components/ExpandableCard";
import { formatJwtExpiration } from "@/shared/utils/formatJWTExpiration";

export default async function Home() {
    const session = await getSession();

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-6 py-32 px-8">
                <div className="w-full flex flex-col items-center gap-5 text-center">
                    <h1 className="font-title01 text-grey-900">
                        Browser Storage Tests
                    </h1>
                    <p className="font-body04 text-grey-700">
                        카카오톡 인앱 브라우저 환경 테스트
                    </p>
                </div>

                {session ? (
                    <div className="w-full flex flex-col gap-2">
                        <ExpandableCard
                            cardTitle="세션 정보"
                            cardDescription="현재 로그인된 사용자의 세션 정보입니다."
                            className="w-full"
                            isExpandable
                        >
                            <ul className="flex flex-col gap-2 font-body06 text-grey-800 list-disc list-inside">
                                <li>이름: {session.user.name}</li>
                                <li>전화번호: {session.user.phoneNumber}</li>
                                <li>
                                    로그인 만료:{" "}
                                    {formatJwtExpiration(session.exp)}
                                </li>
                            </ul>
                        </ExpandableCard>
                        <Button onClick={logout}>로그아웃</Button>
                    </div>
                ) : (
                    <LoginForm />
                )}
            </main>
        </div>
    );
}
