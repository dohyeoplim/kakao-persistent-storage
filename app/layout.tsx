import type { Metadata } from "next";
import "@/styles/theme.css";

export const metadata: Metadata = {
    title: "Kakao Tests",
    description: "카카오 인앱 브라우저 테스트",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased">{children}</body>
        </html>
    );
}
